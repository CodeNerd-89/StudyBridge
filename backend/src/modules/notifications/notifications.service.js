import prisma from '../../config/database.js';

export const NOTIFICATION_TYPES = {
  ADMISSION_UPDATE: 'ADMISSION_UPDATE',
  APPLICATION_DEADLINE: 'APPLICATION_DEADLINE',
  RESULT_UPDATE: 'RESULT_UPDATE',
  REQUIREMENT_UPDATE: 'REQUIREMENT_UPDATE',
  GENERAL_UNIVERSITY_UPDATE: 'GENERAL_UNIVERSITY_UPDATE',
};

/**
 * Get paginated notifications for the current authenticated user.
 */
export const getUserNotifications = async (userId, query = {}) => {
  if (!userId) {
    return { status: 401, body: { success: false, message: 'Unauthorized' } };
  }

  try {
    const page = Math.max(1, parseInt(query.page, 10) || 1);
    const limit = Math.min(100, Math.max(1, parseInt(query.limit, 10) || 20));
    const skip = (page - 1) * limit;
    const unreadOnly = query.unreadOnly === 'true' || query.unreadOnly === true;

    const where = {
      userId,
      ...(unreadOnly ? { isRead: false } : {}),
    };

    const [total, unreadCount, notifications] = await Promise.all([
      prisma.notification.count({ where }),
      prisma.notification.count({ where: { userId, isRead: false } }),
      prisma.notification.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: {
          university: {
            select: {
              id: true,
              name: true,
              country: true,
              city: true,
              ranking: true,
              applicationDeadline: true,
            },
          },
        },
      }),
    ]);

    return {
      status: 200,
      body: {
        success: true,
        data: notifications,
        unreadCount,
        pagination: {
          page,
          limit,
          total,
          totalPages: Math.ceil(total / limit) || 1,
        },
      },
    };
  } catch (error) {
    console.error('getUserNotifications error:', error);
    return { status: 500, body: { success: false, message: 'Failed to retrieve notifications.' } };
  }
};

/**
 * Get unread notification count for the current user.
 */
export const getUnreadCount = async (userId) => {
  if (!userId) {
    return { status: 401, body: { success: false, message: 'Unauthorized' } };
  }

  try {
    const unreadCount = await prisma.notification.count({
      where: { userId, isRead: false },
    });

    return {
      status: 200,
      body: { success: true, unreadCount },
    };
  } catch (error) {
    console.error('getUnreadCount error:', error);
    return { status: 500, body: { success: false, message: 'Failed to get unread count.' } };
  }
};

/**
 * Mark a single notification as read for the authenticated user.
 */
export const markNotificationAsRead = async (userId, notificationId) => {
  if (!userId) {
    return { status: 401, body: { success: false, message: 'Unauthorized' } };
  }

  if (!notificationId) {
    return { status: 400, body: { success: false, message: 'Notification ID is required.' } };
  }

  try {
    const notification = await prisma.notification.findUnique({
      where: { id: notificationId },
    });

    if (!notification) {
      return { status: 404, body: { success: false, message: 'Notification not found.' } };
    }

    if (notification.userId !== userId) {
      return { status: 403, body: { success: false, message: 'You do not have permission to modify this notification.' } };
    }

    const updated = await prisma.notification.update({
      where: { id: notificationId },
      data: { isRead: true },
      include: {
        university: {
          select: {
            id: true,
            name: true,
            country: true,
            city: true,
            ranking: true,
          },
        },
      },
    });

    const unreadCount = await prisma.notification.count({
      where: { userId, isRead: false },
    });

    return {
      status: 200,
      body: {
        success: true,
        message: 'Notification marked as read.',
        data: updated,
        unreadCount,
      },
    };
  } catch (error) {
    console.error('markNotificationAsRead error:', error);
    return { status: 500, body: { success: false, message: 'Failed to update notification.' } };
  }
};

/**
 * Mark all notifications as read for the authenticated user.
 */
export const markAllNotificationsAsRead = async (userId) => {
  if (!userId) {
    return { status: 401, body: { success: false, message: 'Unauthorized' } };
  }

  try {
    const updateResult = await prisma.notification.updateMany({
      where: { userId, isRead: false },
      data: { isRead: true },
    });

    return {
      status: 200,
      body: {
        success: true,
        message: 'All notifications marked as read.',
        count: updateResult.count,
        unreadCount: 0,
      },
    };
  } catch (error) {
    console.error('markAllNotificationsAsRead error:', error);
    return { status: 500, body: { success: false, message: 'Failed to mark notifications as read.' } };
  }
};

/**
 * Dispatch an admission notification to all followers of a specific university.
 */
export const createNotificationForFollowers = async ({
  universityId,
  title,
  message,
  type = NOTIFICATION_TYPES.ADMISSION_UPDATE,
  metadata = null,
}) => {
  if (!universityId || !title || !message) {
    throw new Error('universityId, title, and message are required.');
  }

  const followers = await prisma.followedUniversity.findMany({
    where: { universityId },
    select: { userId: true },
  });

  if (followers.length === 0) {
    return { count: 0, notifiedUserIds: [] };
  }

  const notificationsData = followers.map((f) => ({
    userId: f.userId,
    universityId,
    title,
    message,
    type,
    isRead: false,
    metadata,
  }));

  const result = await prisma.notification.createMany({
    data: notificationsData,
  });

  return {
    count: result.count,
    notifiedUserIds: followers.map((f) => f.userId),
  };
};

/**
 * Create and publish an admission update for a university, automatically notifying followers.
 */
export const createAdmissionUpdate = async (payload = {}) => {
  const { universityId, title, message, type = NOTIFICATION_TYPES.ADMISSION_UPDATE, metadata } = payload;

  if (!universityId || !title || !message) {
    return {
      status: 400,
      body: { success: false, message: 'University ID, title, and message are required.' },
    };
  }

  try {
    const university = await prisma.university.findUnique({
      where: { id: universityId },
    });

    if (!university) {
      return { status: 404, body: { success: false, message: 'University not found.' } };
    }

    const { count, notifiedUserIds } = await createNotificationForFollowers({
      universityId,
      title: title.trim(),
      message: message.trim(),
      type,
      metadata: metadata || {
        universityName: university.name,
        country: university.country,
        actionUrl: `/universities?search=${encodeURIComponent(university.name)}`,
      },
    });

    return {
      status: 201,
      body: {
        success: true,
        message: `Admission update published. Dispatched to ${count} follower(s).`,
        data: {
          universityId,
          universityName: university.name,
          title,
          message,
          type,
          recipientCount: count,
          notifiedUserIds,
        },
      },
    };
  } catch (error) {
    console.error('createAdmissionUpdate error:', error);
    return { status: 500, body: { success: false, message: 'Failed to publish admission update.' } };
  }
};

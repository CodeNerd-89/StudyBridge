import prisma from '../../config/database.js';
import { createNotificationForFollowers } from '../notifications/notifications.service.js';

/**
 * Update university details and optionally broadcast update notifications to all followers.
 */
export const updateUniversity = async (universityId, payload = {}) => {
  if (!universityId) {
    return { status: 400, body: { success: false, message: 'University ID is required.' } };
  }

  const {
    name,
    country,
    city,
    ranking,
    tuitionAnnualUsd,
    acceptanceRate,
    applicationFee,
    applicationDeadline,
    ieltsRequirement,
    greRequirement,
    websiteUrl,
    courses,
    notifyFollowers = true,
    customNotificationTitle,
    customNotificationMessage,
  } = payload;

  try {
    const existing = await prisma.university.findUnique({
      where: { id: universityId },
      include: {
        _count: {
          select: { followers: true },
        },
      },
    });

    if (!existing) {
      return { status: 404, body: { success: false, message: 'University not found.' } };
    }

    const updateData = {};
    if (name !== undefined && typeof name === 'string') updateData.name = name.trim();
    if (country !== undefined && typeof country === 'string') updateData.country = country.trim();
    if (city !== undefined) updateData.city = city ? String(city).trim() : null;
    if (ranking !== undefined) updateData.ranking = Number(ranking);
    if (tuitionAnnualUsd !== undefined) updateData.tuitionAnnualUsd = tuitionAnnualUsd !== '' && tuitionAnnualUsd !== null ? Number(tuitionAnnualUsd) : null;
    if (acceptanceRate !== undefined) updateData.acceptanceRate = acceptanceRate !== '' && acceptanceRate !== null ? Number(acceptanceRate) : null;
    if (applicationFee !== undefined) updateData.applicationFee = applicationFee !== '' && applicationFee !== null ? Number(applicationFee) : null;
    if (applicationDeadline !== undefined) updateData.applicationDeadline = applicationDeadline ? String(applicationDeadline).trim() : null;
    if (ieltsRequirement !== undefined) updateData.ieltsRequirement = ieltsRequirement !== '' && ieltsRequirement !== null ? Number(ieltsRequirement) : null;
    if (greRequirement !== undefined) updateData.greRequirement = greRequirement !== '' && greRequirement !== null ? Number(greRequirement) : null;
    if (websiteUrl !== undefined) updateData.websiteUrl = websiteUrl ? String(websiteUrl).trim() : null;
    if (courses !== undefined) updateData.courses = courses;

    const updated = await prisma.university.update({
      where: { id: universityId },
      data: updateData,
    });

    let notifiedFollowersCount = 0;

    // If notifications are requested and there are followers
    if (notifyFollowers && existing._count.followers > 0) {
      const changesList = [];
      if (applicationDeadline && applicationDeadline !== existing.applicationDeadline) {
        changesList.push(`Application Deadline updated to ${applicationDeadline}`);
      }
      if (tuitionAnnualUsd !== undefined && tuitionAnnualUsd !== existing.tuitionAnnualUsd) {
        changesList.push(`Annual Tuition updated to $${Number(tuitionAnnualUsd).toLocaleString()}`);
      }
      if (ieltsRequirement !== undefined && ieltsRequirement !== existing.ieltsRequirement) {
        changesList.push(`IELTS Requirement updated to ${ieltsRequirement}`);
      }
      if (greRequirement !== undefined && greRequirement !== existing.greRequirement) {
        changesList.push(`GRE Requirement updated to ${greRequirement}`);
      }

      const notifTitle = customNotificationTitle?.trim() || `Admission Update: ${updated.name}`;
      const notifMessage =
        customNotificationMessage?.trim() ||
        (changesList.length > 0
          ? `${updated.name} has updated their admissions criteria: ${changesList.join('; ')}.`
          : `${updated.name} updated their program information and admission details.`);

      const notifResult = await createNotificationForFollowers({
        universityId: updated.id,
        title: notifTitle,
        message: notifMessage,
        type: 'ADMISSION_UPDATE',
        metadata: {
          universityName: updated.name,
          country: updated.country,
          deadline: updated.applicationDeadline,
          tuition: updated.tuitionAnnualUsd,
          actionUrl: `/universities?search=${encodeURIComponent(updated.name)}`,
        },
      });

      notifiedFollowersCount = notifResult.count;
    }

    return {
      status: 200,
      body: {
        success: true,
        message: `University details updated successfully.${notifiedFollowersCount > 0 ? ` Notified ${notifiedFollowersCount} student follower(s).` : ''}`,
        data: updated,
        notifiedFollowersCount,
      },
    };
  } catch (error) {
    console.error('updateUniversity error:', error);
    return { status: 500, body: { success: false, message: 'Failed to update university details.' } };
  }
};

/**
 * Broadcast an announcement directly to followers of a university.
 */
export const broadcastAnnouncement = async (universityId, payload = {}) => {
  const { title, message, type = 'ADMISSION_UPDATE' } = payload;

  if (!universityId || !title?.trim() || !message?.trim()) {
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

    const { count } = await createNotificationForFollowers({
      universityId,
      title: title.trim(),
      message: message.trim(),
      type,
      metadata: {
        universityName: university.name,
        country: university.country,
        actionUrl: `/universities?search=${encodeURIComponent(university.name)}`,
      },
    });

    return {
      status: 201,
      body: {
        success: true,
        message: `Announcement broadcasted to ${count} follower(s) of ${university.name}.`,
        recipientCount: count,
      },
    };
  } catch (error) {
    console.error('broadcastAnnouncement error:', error);
    return { status: 500, body: { success: false, message: 'Failed to broadcast announcement.' } };
  }
};

/**
 * Update scholarship details and optionally notify followers of related universities in the country.
 */
export const updateScholarship = async (scholarshipId, payload = {}) => {
  if (!scholarshipId) {
    return { status: 400, body: { success: false, message: 'Scholarship ID is required.' } };
  }

  const {
    name,
    country,
    amountUsd,
    fundingLevel,
    eligibility,
    deadline,
    websiteUrl,
    notifyFollowers = false,
    targetUniversityId,
  } = payload;

  try {
    const existing = await prisma.scholarship.findUnique({
      where: { id: scholarshipId },
    });

    if (!existing) {
      return { status: 404, body: { success: false, message: 'Scholarship not found.' } };
    }

    const updateData = {};
    if (name !== undefined) updateData.name = name.trim();
    if (country !== undefined) updateData.country = country.trim();
    if (amountUsd !== undefined) updateData.amountUsd = amountUsd !== '' && amountUsd !== null ? Number(amountUsd) : null;
    if (fundingLevel !== undefined) updateData.fundingLevel = fundingLevel.trim();
    if (eligibility !== undefined) updateData.eligibility = eligibility ? String(eligibility).trim() : null;
    if (deadline !== undefined) updateData.deadline = deadline ? String(deadline).trim() : null;
    if (websiteUrl !== undefined) updateData.websiteUrl = websiteUrl ? String(websiteUrl).trim() : null;

    const updated = await prisma.scholarship.update({
      where: { id: scholarshipId },
      data: updateData,
    });

    let notifiedCount = 0;

    if (notifyFollowers) {
      // If targetUniversityId is provided, notify its followers
      if (targetUniversityId) {
        const notifResult = await createNotificationForFollowers({
          universityId: targetUniversityId,
          title: `Scholarship Update: ${updated.name}`,
          message: `New scholarship opportunity updated: ${updated.name} (${updated.fundingLevel}, $${updated.amountUsd?.toLocaleString() || 'Varies'}). Deadline: ${updated.deadline || 'Ongoing'}.`,
          type: 'SCHOLARSHIP_UPDATE',
          metadata: {
            scholarshipName: updated.name,
            country: updated.country,
            deadline: updated.deadline,
            actionUrl: `/scholarships?search=${encodeURIComponent(updated.name)}`,
          },
        });
        notifiedCount = notifResult.count;
      }
    }

    return {
      status: 200,
      body: {
        success: true,
        message: 'Scholarship updated successfully.',
        data: updated,
        notifiedCount,
      },
    };
  } catch (error) {
    console.error('updateScholarship error:', error);
    return { status: 500, body: { success: false, message: 'Failed to update scholarship.' } };
  }
};

/**
 * Get quick admin dashboard stats.
 */
export const getAdminStats = async () => {
  try {
    const [
      universityCount,
      scholarshipCount,
      studentCount,
      followCount,
      notificationCount,
      recentFollows,
    ] = await Promise.all([
      prisma.university.count(),
      prisma.scholarship.count(),
      prisma.student.count(),
      prisma.followedUniversity.count(),
      prisma.notification.count(),
      prisma.followedUniversity.findMany({
        take: 5,
        orderBy: { createdAt: 'desc' },
        include: {
          student: { select: { id: true, name: true, email: true } },
          university: { select: { id: true, name: true, country: true } },
        },
      }),
    ]);

    return {
      status: 200,
      body: {
        success: true,
        data: {
          universityCount,
          scholarshipCount,
          studentCount,
          totalFollows: followCount,
          totalNotificationsSent: notificationCount,
          recentFollows,
        },
      },
    };
  } catch (error) {
    console.error('getAdminStats error:', error);
    return { status: 500, body: { success: false, message: 'Failed to get admin statistics.' } };
  }
};

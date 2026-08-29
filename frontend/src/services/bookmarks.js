const BOOKMARKS_KEY = 'universityBookmarks';

// Get all bookmarked universities
export const getBookmarks = () => {
  try {
    const raw = localStorage.getItem(BOOKMARKS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

// Check if a university is bookmarked
export const isBookmarked = (universityId) => {
  return getBookmarks().some((b) => b.id === universityId);
};

// Toggle bookmark — returns true if now bookmarked, false if removed
export const toggleBookmark = (university) => {
  const bookmarks = getBookmarks();
  const idx = bookmarks.findIndex((b) => b.id === university.id);

  if (idx >= 0) {
    bookmarks.splice(idx, 1);
  } else {
    bookmarks.push({
      id: university.id,
      name: university.name,
      country: university.country,
      city: university.city,
      ranking: university.ranking,
    });
  }

  localStorage.setItem(BOOKMARKS_KEY, JSON.stringify(bookmarks));
  window.dispatchEvent(new Event('bookmarkschange'));
  return idx < 0;
};

// Remove a specific bookmark
export const removeBookmark = (universityId) => {
  const bookmarks = getBookmarks().filter((b) => b.id !== universityId);
  localStorage.setItem(BOOKMARKS_KEY, JSON.stringify(bookmarks));
  window.dispatchEvent(new Event('bookmarkschange'));
};

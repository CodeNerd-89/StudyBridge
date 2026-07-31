Establish API rules

URL convention

Use:

/api/v1/...

Examples:

GET    /api/v1/universities
GET    /api/v1/universities/:id
POST   /api/v1/universities
PATCH  /api/v1/universities/:id
DELETE /api/v1/universities/:id

Scholarships:

GET /api/v1/scholarships
GET /api/v1/scholarships/:id

Tests:

GET  /api/v1/tests
GET  /api/v1/tests/:id
POST /api/v1/tests/:id/attempts
GET  /api/v1/attempts/:id/result

Applications:

GET   /api/v1/applications
POST  /api/v1/applications
GET   /api/v1/applications/:id
PATCH /api/v1/applications/:id

AI:

POST /api/v1/ai/chat
GET  /api/v1/ai/conversations
GET  /api/v1/ai/conversations/:id






Standardise API responses

This is extremely important.

Don't let Person 2 return:

{
  "universities": []
}

Person 3:

{
  "data": []
}

Person 4:

{
  "result": []
}

Instead, establish one format.

Success
{
  "success": true,
  "data": {},
  "message": "Request successful"
}

For lists:

{
  "success": true,
  "data": [],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 100
  }
}
Error
{
  "success": false,
  "message": "University not found",
  "error": {
    "code": "UNIVERSITY_NOT_FOUND"
  }
}

Everyone follows this.
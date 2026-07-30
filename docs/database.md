User
 │
 └── StudentProfile
       │
       ├── AcademicQualification
       ├── TestScore
       │
       ├── UniversityBookmark
       │         │
       │         └── University
       │                │
       │                └── Program
       │
       ├── ScholarshipBookmark
       │         │
       │         └── Scholarship
       │
       ├── MockTestAttempt
       │
       ├── Application
       │
       ├── Notification
       │
       └── AIConversation


       university side:

University
    │
    ├── Program
    │      └── ProgramRequirement
    │
    └── UniversityRequirement

Scholarship side:

Scholarship
    │
    └── ScholarshipRequirement

Test side:

Test
 │
 └── Question
       │
       └── QuestionOption

Student
 │
 └── TestAttempt
       │
       └── TestAnswer

Application side:

Student
 │
 └── Application
       │
       ├── ApplicationDocument
       └── ApplicationStatusHistory
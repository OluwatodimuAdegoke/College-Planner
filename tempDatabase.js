const database = {
  users: [
    {
      uid: "user1",
      name: "John Doe",
      email: "john.doe@example.com",
      profilePicture: require("./assets/profile.jpg"),
      schedules: [
        {
          id: "schedule1",
          name: "Fall 2023 Schedule",
          courses: [
            {
              id: "course1",
              name: "Data Structures",
              code: "CS201",
              section: "A",
              location: "Building A, Room 102",
              startTime: "10:00 AM",
              endTime: "11:30 AM",
              days: ["Monday", "Wednesday", "Friday"],
            },
            {
              id: "course2",
              name: "Algorithms",
              code: "CS301",
              section: "B",
              location: "Building C, Room 205",
              startTime: "2:00 PM",
              endTime: "3:30 PM",
              days: ["Tuesday", "Thursday"],
            },
            {
              id: "course3",
              name: "Database Systems",
              code: "CS401",
              section: "A",
              location: "Building B, Room 101",
              startTime: "11:00 AM",
              endTime: "12:30 PM",
              days: ["Monday", "Wednesday"],
            },
          ],
        },
      ],
      assignments: [
        {
          id: "assignment1",
          name: "Final Project",
          description: "Build a mobile app using React Native",
          date: new Date("2024-05-06").toDateString(),
          course: "course1",
        },
        {
          id: "assignment2",
          name: "Homework 3",
          description: "Implement a graph algorithm",
          date: new Date("2024-05-05").toDateString(),
          course: "course2",
        },
        {
          id: "assignment3",
          name: "Database Design",
          description: "Design a database schema for an e-commerce platform",
          date: new Date("2024-05-10").toDateString(),
          course: "course3",
        },
      ],
      tasks: [
        {
          id: "task1",
          name: "Study for Data Structures exam",
          description: "Review linked lists and tree data structures",
          date: new Date("2024-05-13").toDateString(),
          completed: true,
          course: "course1",
        },
        {
          id: "task2",
          name: "Study for Data Structures exam 2",
          description: "Review linked lists and tree data structures",
          date: new Date("2024-05-14").toDateString(),
          completed: false,
          course: "course1",
        },
        {
          id: "task3",
          name: "Read Chapter 3",
          description: "Read chapter on graph algorithms",
          date: new Date("2024-05-14").toDateString(),
          completed: false,
          course: "course2",
        },
        {
          id: "task4",
          name: "Practice SQL queries",
          description: "Solve practice problems on SQL queries",
          date: new Date("2024-05-14").toDateString(),
          completed: false,
          course: "course3",
        },
        {
          id: "task5",
          name: "Read Chapter 4",
          description: "Read chapter on graph algorithms",
          date: new Date("2024-05-14").toDateString(),
          completed: false,
          course: "course2",
        },
        {
          id: "task6",
          name: "Read Chapter 5",
          description: "Read chapter on graph algorithms",
          date: new Date("2024-05-20").toDateString(),
          completed: true,
          course: "course2",
        },
        {
          id: "task7",
          name: "Read",
          description: "Read chapter on graph algorithms",
          date: new Date("2024-05-05").toDateString(),
          completed: true,
          course: "course2",
        },
        {
          id: "task8",
          name: "Read",
          description: "Read chapter on graph algorithms",
          date: new Date("2024-05-05").toDateString(),
          completed: true,
          course: "course2",
        },
        {
          id: "task12",
          name: "Heare",
          description: "Read chapter on graph algorithms",
          date: new Date("2024-05-07").toDateString(),
          completed: true,
          course: "course2",
        },
        {
          id: "task13",
          name: "Read Chapter 32",
          description: "Read chapter on graph algorithms",
          date: new Date("2024-05-07").toDateString(),
          completed: true,
          course: "course2",
        },
      ],
      studySessions: [
        {
          id: "session1",
          course: "course1",
          startTime: "2023-10-18T18:00:00",
          endTime: "2023-10-18T20:00:00",
          duration: 120,
          notes: "Covered topics on binary trees and AVL trees",
        },
        {
          id: "session2",
          course: "course2",
          startTime: "2023-10-22T14:00:00",
          endTime: "2023-10-22T16:30:00",
          duration: 150,
          notes: "Studied graph traversal algorithms",
        },
        {
          id: "session3",
          course: "course3",
          startTime: "2023-11-03T10:00:00",
          endTime: "2023-11-03T12:30:00",
          duration: 150,
          notes: "Practiced SQL queries and normalization",
        },
      ],
      notifications: [
        {
          id: "notification1",
          title: "Assignment Due Tomorrow",
          body: "Don't forget to submit your Final Project",
          sentAt: new Date("2023-12-14T18:00:00"),
          assignment: "assignment1",
        },
        {
          id: "notification2",
          title: "Exam Reminder",
          body: "Your Final Exam for Algorithms is in 3 days",
          sentAt: new Date("2023-12-15T10:00:00").toDateString(),
          exam: "exam2",
        },
        {
          id: "notification3",
          title: "New Assignment Posted",
          body: "A new assignment 'Database Design' has been posted",
          sentAt: new Date("2023-11-05T09:00:00").toDateString(),
          assignment: "assignment3",
        },
      ],
      exams: [
        {
          id: "exam1",
          name: "Midterm Exam",
          course: "course1",
          date: new Date("2023-10-20").toDateString(),
          startTime: "9:00 AM",
          endTime: "11:00 AM",
          location: "Building B, Room 203",
        },
        {
          id: "exam2",
          name: "Final Exam",
          course: "course2",
          date: new Date("2023-12-18").toDateString(),
          startTime: "1:00 PM",
          endTime: "4:00 PM",
          location: "Building A, Room 105",
        },
      ],
    },
  ],
};

export default database;

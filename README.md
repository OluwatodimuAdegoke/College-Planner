# College Planner App

College Planner is a comprehensive React Native application designed to help college students organize their academic lives efficiently. With features tailored for course management, task tracking, study sessions, and more, it's the ultimate tool for managing your college workload.

## Features

- **Course Management**: Add, view, edit, and delete courses. Each course includes details like code, name, section, location, and schedule.
- **Task Tracking**: Create, manage, and mark tasks as complete. Tasks can be associated with specific courses.
- **Assignments & Exams**: This section allows you to keep track of upcoming assignments and exams, with details like course, date, location, and time.
- **Study Sessions**: Set up study sessions with timers, track your study history, and analyze your study patterns.
- **Calendar Integration**: You can view all your events (courses, exams, assignments) in a calendar view.
- **Term Management**: Organize your courses and tasks by academic terms.
- **User Authentication**: Secure login, registration, and profile management.
- **Image Customization**: Choose custom images for your courses.

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/college-planner.git
   cd college-planner
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up Firebase:
   - Create a Firebase project at [Firebase Console](https://console.firebase.google.com/)
   - Enable Authentication, Firestore, and Storage
   - Replace the `firebaseConfig` object in `firebaseConfig.js` with your own configuration

4. Run the app:
   ```bash
   npm start
   ```
   Then, press `a` for Android or `i` for iOS, or scan the QR code with the Expo Go app.

## Project Structure

- `components/`: Reusable components like `ItemComponent.js`
- `screens/`: Main screens of the app (Home, Tasks, Courses, etc.)
- `modals/`: Modal components for adding and editing events
- `assets/`: Static assets like images
- `firebaseConfig.js`: Firebase configuration and utility functions

## Key Dependencies

- React Native
- Firebase (Auth, Firestore, Storage)
- React Navigation
- date-fns
- react-native-paper
- react-native-vector-icons

## Firebase Setup

College Planner uses Firebase for backend services:
- **Authentication**: Email/password login
- **Firestore**: Store user data, courses, tasks, assignments, etc.
- **Storage**: Store profile pictures and course images

Make sure to set up security rules in Firebase to protect user data.

## License

This project is open-source and available under the [MIT License](LICENSE).

## Contact

- Your Name - [Oluwatodimuadegoke@gmail.com)
- Project Link: [https://github.com/yourusername/college-planner](https://github.com/yourusername/college-planner)

## Acknowledgements

- [React Native Documentation](https://reactnative.dev/)
- [Firebase Documentation](https://firebase.google.com/docs)
- [React Navigation](https://reactnavigation.org/)
- [date-fns](https://date-fns.org/)
```

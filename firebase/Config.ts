// Import the functions you need from the SDKs you need
import {initializeApp} from "firebase/app";
import {getAnalytics, isSupported} from "firebase/analytics";
import {get, getDatabase, ref} from "@firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = isSupported().then(yes => yes ? getAnalytics(app) : null);

const db = getDatabase(app);
const filterRef = ref(db, 'filters');
const projectRef = ref(db, "projects")

export const getFilterMenuItems = async () => {
    const dataSnapshot = await get(filterRef);
    return dataSnapshot.val()
}

export const getProjects = async (filter: string) => {
    try {
        let projects = [];
        const dataSnapshot = await get(projectRef);
        projects = dataSnapshot.val();

        if (filter == "all") {
            return projects;
        } else {
            const filteredDataSnapshot = await get(projectRef);
            projects = filteredDataSnapshot.val();
            switch (filter) {
                case "NextJS/React":
                    projects = projects.filter((project: Project) => project.stack.includes("NextJS" || "React"))
                    break;
                case "React Native/Expo":
                    projects = projects.filter((project: Project) => project.stack.includes("Expo" || "React Native") )
                    break;
                case "Jetpack Compose":
                    projects = projects.filter((project: Project) => project.stack.includes("Jetpack Compose"))
                    break;
            }
        }
        console.log(projects)
        return projects;
    }catch (e) {
        console.log(e)
    }
}

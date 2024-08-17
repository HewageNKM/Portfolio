import {initializeApp} from "firebase/app";
import {getAnalytics, isSupported} from "firebase/analytics";
import {get, getDatabase, ref} from "@firebase/database";

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
        let projects;
        const filteredDataSnapshot = await get(projectRef);
        projects = filteredDataSnapshot.val();
        switch (filter) {
            case "NextJS/React":
                let nextProjects = projects;
                projects = projects.filter((project: Project) => project.stack.includes("React"));
                nextProjects = nextProjects.filter((project: Project) => project.stack.includes("NextJS"));
                projects = projects.concat(nextProjects)
                break;
            case "React Native/Expo":
                let reactNativeProjects = projects;
                projects = projects.filter((project: Project) => project.stack.includes("Expo"))
                reactNativeProjects = projects.filter((project: Project) => project.stack.includes("React Native"));
                projects = projects.concat(reactNativeProjects)
                break;
            case "Jetpack Compose":
                projects = projects.filter((project: Project) => project.stack.includes("Jetpack Compose"))
                break;
            case "All":
                return projects;
            default:
                projects = []
        }
        console.log(projects)
        return projects;
    } catch (e) {
        console.log(e)
    }
}

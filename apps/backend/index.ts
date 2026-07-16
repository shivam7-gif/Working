import express  from "express";
const app = express();
import axios from "axios";
import {preInterviewBody} from "./types";
import  cors from "cors";

app.use(cors({
    origin : "*",
}));
app.use(express.json());
app.post("/api/v1/pre-interview",async (req, res) => {
    const {success ,data } = preInterviewBody.safeParse(req.body);

    if(!success){
        res.status(411).json({
            message : "Incorrect body"
        });
        return;
    }

    const githubUrl = data.gitHub;
    // const linkedinUrl = data.linkedin;

    console.log("Received GitHub URL:", githubUrl);

    // Extract username from GitHub URL
    const gitHubUsername = githubUrl.endsWith("/") 
        ? githubUrl.slice(0, -1).split("/").pop() 
        : githubUrl.split("/").pop();

    console.log("Extracted username:", gitHubUsername);

    try {
        const userRepos = await axios.get(`https://api.github.com/users/${gitHubUsername}/repos`);
        
        // console.log("GitHub API response status:", userRepos.status);
        // console.log("GitHub API response data length:", userRepos.data.length);
        // console.log("Full GitHub API response:", JSON.stringify(userRepos.data, null, 2));

        const filteredUserRepos = userRepos.data.map((x : any)=>({
                description : x.description,
                name : x.name ,
                fullName : x.full_name ,
                starcount : x.stargazers_count
        }));
        console.log("Filtered repos:", filteredUserRepos);

        res.json({
            success: true,
            repos: filteredUserRepos
        });
    } catch (error) {
        console.error("Error fetching GitHub repos:", error);
        res.status(500).json({
            message: "Failed to fetch GitHub repositories",
            error: error instanceof Error ? error.message : "Unknown error"
        });
    }


});
app.listen(3001, () => {
    console.log("Server is running on port 3001");
});
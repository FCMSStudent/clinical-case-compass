# How to Host This Project Locally

This guide provides a quick summary of the steps needed to get this project running on your local machine for development purposes. For more detailed information, please refer to the main `README.md` file.

## 1. Prerequisites

Ensure you have the following software installed:

*   **Node.js**: Version 18.x or later recommended. This includes `npm` (Node Package Manager).
    *   Download from [https://nodejs.org/](https://nodejs.org/)
*   **npm**: Comes with Node.js. Used for installing project dependencies.
*   **Git**: For cloning the project repository.
    *   Download from [https://git-scm.com/](https://git-scm.com/)
*   **(Optional) Bun**: An alternative to npm for package management and running scripts.
    *   Installation instructions at [https://bun.sh/](https://bun.sh/)

## 2. Clone the Repository

Open your terminal and navigate to the directory where you want to store the project. Then, run:

```bash
git clone <repository_url>
cd <project_directory_name>
```
Replace `<repository_url>` with the actual URL of this Git repository and `<project_directory_name>` with the name of the folder created by the clone command.

## 3. Install Dependencies

Once inside the project directory, install the necessary packages using either npm or Bun:

*   **Using npm:**
    ```bash
    npm install
    ```
*   **Or, using Bun:**
    ```bash
bun install
```

If you update the repository or switch branches later, run `npm install` again so that new dependencies (like Vite plugins) are installed.

## 4. Set Up Environment Variables (Supabase)

This project uses Supabase for its backend. You'll need to connect it to your own Supabase project.

1.  **Create/Access your Supabase Project**:
    *   Go to [Supabase](https://supabase.com/), sign up or log in, and create a new project if you don't have one.
2.  **Get API Credentials**:
    *   In your Supabase project dashboard, go to `Settings` -> `API`.
    *   Copy your **Project URL** and your **anon key** (public).
3.  **Create `.env` File**:
    *   In the root directory of your cloned project, create a file named `.env`.
4.  **Add Credentials to `.env` File**:
    *   Open the `.env` file and add your credentials like this:
        ```env
        VITE_SUPABASE_URL=your_supabase_project_url
        VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
        ```
    *   Replace `your_supabase_project_url` and `your_supabase_anon_key` with your actual Supabase project details. The `VITE_` prefix is important.

## 5. Run the Development Server

Finally, start the local development server:

*   **Using npm:**
    ```bash
    npm run dev
    ```
*   **Or, using Bun:**
    ```bash
    bun run dev
    ```

This will typically make the application available at `http://localhost:8080` in your web browser. Check the terminal output for the exact URL.

---

Now you can access the application locally, make code changes, and see them reflected in real-time.

-----

# Contributing to the IEEE DTU Website

Refer to [IEEE-DTU](https://www.ieeedtu.in/) existing website for the design to be build as

These guidelines ensure smooth collaboration, clean code, and a respectful working environment for all contributors. Please read carefully before contributing.

 1. Git & Branch Management

Commit Messages

Keep commit names meaningful, concise, and respectful. Clearly describe what was changed or added.

Branching

  - Create a *separate working branch* for your tasks.
  - You may create a *feature branch* (e.g., feature/navbar) or a *branch with your name* (e.g., john-homepage).

 Main Branch Protection

  - *Do not commit or push directly* to the main branch.
  - Always create a *Pull Request (PR)* to merge changes into main.

No Cross-Branch Changes

  - Only work within your assigned branch. Do not make changes in other contributors’ branches without permission.

-----
 2. Development Practices

Assigned Tasks First

Prioritize and complete your assigned tasks before picking up additional work.

Code Quality

  - Follow *best coding practices* (clean, modular, reusable code).
  - Avoid unnecessary complexity—keep code readable.

 Dependencies

  - *Do not add new dependencies* without consulting the team lead. If a dependency is needed, explain why and how it will be used before installing.

No AI Code Generation

  - All code must be written manually to promote learning.

-----

 3. Collaboration & Respect

 Communication

  - Discuss major changes in the group before implementation.

Respect Others’ Work

  - Do not overwrite or refactor someone else’s work without discussion.

 Constructive Feedback

  - When reviewing PRs, give clear, respectful, and actionable suggestions.

-----

4. Key Development Principles

Avoid Hardcoding

  - Use CSS variables, rem, %, vw/vh for sizing, and flexible layouts (Flexbox / Grid).
  - Avoid directly writing pixel values like 250px. Instead, use relative units like 2rem or 20%.

 Responsive-First

  - Design components mobile-first.
  - Always test how your component or page looks on common breakpoints (mobile, tablet, desktop).

-----

GitHub Flow for Beginners (Shared Repository)

Follow these steps to contribute:

1.  *Clone the Repository*

      - Clone the main project repository to your local machine.

        ```bash
        git clone https://github.com/IEEEDTUCS/IEEEWeb-2025.git
        cd frontend
        npm i
        npm run dev
        ```    

      - Before starting any new work, make sure your local main branch is up-to-date with the remote repository.

        ```bash
        git checkout main
        git pull origin main
        ```
        
      - Now, create your new branch from the up-to-date main branch. Name it according to the guidelines (e.g., feature/login-page or yourname).

        ```bash
        git checkout -b <your-branch-name>
        ```

2.  *Make Your Changes*
      - Once you have completed your changes, stage and commit them with a clear, descriptive message.

        ```bash
        # Add all your changes
        git add .

        # Commit with a meaningful message
        git commit -m "your_commit_message"
        ```

3.  *Push Your Branch to the Repository*

      - Push your new branch and its commits to the main repository on GitHub.
      - 
        ```bash
        git push -u origin <your-branch-name>
        ```
      - The -u flag sets the upstream branch so in the future you can simply run:
      -
          ```bash
         git push 
          ```
    
      
4.  *Create a Pull Request (PR)*

      - Go to the main repository page on GitHub.
      - GitHub will often show a prompt to "Compare & pull request" for your recently pushed branch. Click it.
      - If you don't see the prompt, go to the "Pull requests" tab and click "New pull request".
      - Set the base branch to main and the compare branch to <your-branch-name>.
      - Add a title and a clear description of the changes you made, then click "Create pull request". This will notify the team leads to review your code.

-----

5. Tools & Stack

  - *Frontend:* Next.js (Page Router), TailwindCSS or Vanilla CSS, shadcn, MUI, lucide-react.
  - *Backend:* A separate backend directory will be used for APIs and future features.
.
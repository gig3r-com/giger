# Giger Backend Server

This guide will walk you through the process of setting up a virtual environment, activating it on both Windows and Linux, and installing the required packages from `requirements.txt` for your Flask-SocketIO backend application.

## Prerequisites

- Python 3.x
- `virtualenv` (for creating virtual environments)

## Step 1: Clone the Repository

Clone your repository to your local machine using:

```bash
git clone <repository_url>
cd <repository_directory>
```

## Step 2: Create a Virtual Environment

### Windows

Open a command prompt and navigate to your project directory. Create a virtual environment by running:

```bash
python -m venv venv
```

### Linux

Open a terminal and navigate to your project directory. Create a virtual environment by running:

```bash
python3 -m venv venv
```

## Step 3: Activate the Virtual Environment

### Windows

Activate the virtual environment by running:

```bash
venv\Scripts\activate
```

### Linux

Activate the virtual environment by running:

```bash
source venv/bin/activate
```

You'll know the virtual environment is active when you see `(venv)` in your command prompt or terminal.

## Step 4: Install Required Packages

With the virtual environment activated, install the required packages from `requirements.txt`:

```bash
pip install -r requirements.txt
```

## Step 5: Configure Application

Modify the necessary configuration files for your Flask-SocketIO backend application.

## Step 6: Run db upgrade

Run db upgrade with every deployment.
```bash
flask db upgrade
```

## Step 7: Run the Application

Start your Flask-SocketIO application:

```bash
python app.py
```

## Step 8: Access the Application

Your Flask-SocketIO backend application should now be running. You can access it by opening a web browser and navigating to the appropriate address (e.g., `http://localhost:5000`).

## Deactivate the Virtual Environment

To deactivate the virtual environment and return to the global Python environment, simply run:

```bash
deactivate
```

## Additional Notes

- Always activate the virtual environment before working on your Flask-SocketIO application.
- Remember to update the `requirements.txt` file whenever you add new packages to your project. You can do this by running:

```bash
pip freeze > requirements.txt
```

This will update the `requirements.txt` file with the current list of packages installed in your virtual environment.

By following these steps, you should be able to set up your Flask-SocketIO backend application with ease on both Windows and Linux environments.

## Contact
In case of any questions please contact herrczarny - at - gmail.com
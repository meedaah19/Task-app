import { useState } from "react";
import Project from "./component/Project";
import NoProject from "./component/NoProject";
import SideBar from "./component/SideBar";
import SelectedProject from "./component/SelectedProject";

function App() {
  const[newProject, setNewProject] = useState({
    selectedProject : undefined,
    project : [],
    tasks : []
  });

  function handleAddTask(text){
    setNewProject( prevState => {
      const taskId = Math.random();
      const newTask = {
        text: text,
        project : prevState.selectedProject,
        id: taskId
      };
  
      return {
        ...prevState,
        tasks : [...prevState.tasks, newTask]
      };
    });
  }

  function handleDeleteTask(id){
    setNewProject( prevState => {
      return {
        ...prevState,
        tasks: prevState.tasks.filter((task) => task.id !== id ),
      };
    });
  }

function handleClick(){
  setNewProject( prevState => {
    return {
      ...prevState,
      selectedProject: null,
    };
  });
}

function handleCancel(){
  setNewProject( prevState => {
    return {
      ...prevState,
      selectedProject: undefined,
    };
  });
}

function handleDelete(){
  setNewProject( prevState => {
    return {
      ...prevState,
      selectedProject: undefined,
      project: prevState.project.filter((project) => project.id !== prevState.selectedProject ),
    };
  });
}

function handleSelectProject(id){
  setNewProject( prevState => {
    return {
      ...prevState,
      selectedProject: id,
    };
  });
}

function handleAddProject(projectData){
  setNewProject( prevState => {
    const newProject = {
      ...projectData,
      id: Math.random()
    };

    return {
      ...prevState,
      selectedProject: undefined,
      project : [...prevState.project, newProject]
    };
  });
}

const selectedProjectId = newProject.project.find(projects => projects.id === newProject.selectedProject);

let content = <SelectedProject 
  project={selectedProjectId}
  onDelete={handleDelete}
  onAddTask ={handleAddTask}
  onDeleteTask = {handleDeleteTask}
  tasks = {newProject.tasks }
  />;

if( newProject.selectedProject === null ){
  content = <Project onAdd={handleAddProject} onCancel={handleCancel}/>
} else if(newProject.selectedProject === undefined){
  content = <NoProject onSelectedProject={handleClick}/>
}

  return (
    <>
      <main className="h-screen my-8 flex gap-8">
        <SideBar  onSelectedProject={handleClick}
        project = {newProject.project}
        onSelectProject = {handleSelectProject}
        selectProjectId = {newProject.selectedProject}
        />
        {content}
      </main>
    </>
  );
}

export default App;

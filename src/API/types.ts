type TTask = {
  id: string;
  text: string | null;
  isDone: boolean;
  children: TTasksList;
};

type TTasksList = TTask[];

type TResponse = {
  tasks: TTasksList;
};

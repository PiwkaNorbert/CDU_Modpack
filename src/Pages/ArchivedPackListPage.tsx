import useArchivedModpackData from "../API/useArchivedModpackData";
import { useQueryClient } from "@tanstack/react-query";
import ModpackListView from "../Components/ModpackListView";

const ArchivedPackListPage = () => {
  const queryClient = useQueryClient();
  const packData = useArchivedModpackData(queryClient);

  return <ModpackListView packData={packData} />;
};

export default ArchivedPackListPage;

import { useAppSelector } from "@main/features/hooks";
import { selectCurrentUser } from "@redux/slices/authentication.slice";

const Welcome = () => {
  const user = useAppSelector(selectCurrentUser)
  return (
    <>
      <h3 className="mt-2 ms-2">Welcome {user?.name}!</h3>
    </>
  );
};

export default Welcome;

import { useRouteMatch } from "react-router-dom";
function useFormUtils(props) {
    let match = useRouteMatch();

    const isNew = () => !Boolean(match.params.id)

    const getId = () => match.params.id

    return {
        isNew,
        getId,
    }
}

export default useFormUtils;
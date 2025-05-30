import { getTaskById } from "@/api/TaskAPI"
import { useQuery } from "@tanstack/react-query"
import { useLocation, useParams } from "react-router-dom"

export default function EditTaskData() {
    const params = useParams()
    const projectId = params.projectId!


    const location = useLocation()
    const queryParams = new URLSearchParams(location.search)
    const taskId = queryParams.get('editTask')!

    const data = useQuery({
        queryKey: ['task', taskId],
        queryFn: () => getTaskById({ projectId, taskId })
    })

    console.log(data.data)

    return (
        <div>EditTaskData</div>
    )
}

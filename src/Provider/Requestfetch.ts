
import { RequestModel, RequestModelFile } from "./model/FetchModel";


const URLBase: string = 'https://dev-adproveedor.sincoerp.com/api'


export async function downloadFile(request: RequestModelFile) {

    let Init: RequestInit = {
        method: request.type,
    };


    Init.headers = { ...Init.headers };

    try {
        const response: Response = await fetch(`${URLBase}/${request.metodo}`, Init);
        const file = await response.blob();

        let temp_link = document.createElement('a');
        temp_link.href = URL.createObjectURL(file);

        temp_link.download = request.filename;
        document.body.appendChild(temp_link);
        temp_link.click();

    } catch (error) {
        return null;
    }
}


export async function requestAPI<TResponse>(request: RequestModel): Promise<TResponse | null> {

    let Init: RequestInit = {
        method: request.type       
    };

    if (request.AllowAnonymous == null) request.AllowAnonymous = false;
    if (request.isformData == null) request.isformData = false;

    if (!request.isformData)
        Init.headers = {
            "Accept": `application/json`,
            "Content-Type": 'application/json'
        }


   debugger;



    if (request.data != null && !request.isformData)
        Init.body = JSON.stringify(request.data);
    else if (request.data != null && request.isformData)
        Init.body = (request.data as any);

    ///       Init.mode="no-cors";
    try {
        const response: Response = await fetch(`${URLBase}/${request.metodo}`, Init);

        return await response.json();
    } catch (error) {
        return null;
    }

}
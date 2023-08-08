import { json_decode } from "./json_decode";
import { json_encode } from "./json_encode";

function cloneObj(obj){
    return json_decode(
        json_encode(obj)
    )
}

export {cloneObj}

import development from "./development.json"
import production from "./production.json"
const cfg = import.meta.env.MODE == "production" ? production : development

export default cfg

const addNoteRequest =(req, res, next) => { 
	Console.log(`[${new Date().toLocaleString()}] Request received at the endpoint: ${req.url} to add the following note: ${req.body.notes} as part of the medical history of the patient with ID: ${req.params.id}`)
	Next();
}
module.exports = addNoteRequest;
const { SalableApi } = require("@salable/node-sdk");

// handler is the function that is called when the api is called
// The handler checks for a valid session, whether the user is licensed with Salable, and then calls callGPT
export default async function handler(req, res) {
  const { user_id } = req.query;
  console.log("User ID: "+user_id)
  if (!user_id) {
    return res.status(401).json({ id: null });
  } else {
    console.log("User ID: "+user_id)
    const api = new SalableApi(process.env["SALABLE_API_KEY"]);
    try {
      const returnBody = await api.licenses.createLicense(
        {
        "planUuid": "a192364d-e5d3-4a73-8f2c-a243f5eaa25c",
        "member": `${user_id}@guild.ist`,
        "granteeId": user_id
      })
      return res.status(200).json({ data: returnBody });
    } catch (err) {
      console.error(err);   
      return res.status(200).json({ error: true });   
    }    
  }  
}



export const SalableStatus = ({capabilities, licenses}) => {
    return(
        <div>
                <h3>Salable - Status</h3>
                <div>
                  <b>Capabilities</b>:  {capabilities.join(", ")}
                </div>
                <div> 
                  <b>Active Licenses:</b>
                  {licenses.map((license, idx) => {if (license.status=="ACTIVE") return (<div key={idx}>
                  <div>
                    <b>License UUID</b>: {license.uuid}
                  </div>                  
                  <div>
                    Product: {license.product.name}
                  </div>
                  <div>
                    Capabilities: {license.capabilities.map(cap => { return cap.name}).join(", ")}
                  </div>
                  <div>
                    Grantee Email: {license.email}
                  </div>
                  <div>
                    Status: {license.status}
                  </div>                  
                  <div>
                    License End Date: {license.endTime}
                  </div>
                  <hr />
                  </div>)})}
                </div>
              </div>
    )
}
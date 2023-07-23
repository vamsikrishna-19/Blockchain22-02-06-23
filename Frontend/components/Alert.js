import React from 'react'

const Alert = (props)  => {
  const capitalize=(string)=>{
    return string.charAt(0).toUpperCase()+string.substring(1);
  }
  return (
    <>
      {
        props.alert &&
        <div>
          <div className={`alert alert-${props.alert.type}`} style={{borderColor:"black"}} role="alert">
            <b className='mx-1'>{capitalize(props.alert.type)}</b>:
          <b className='mx-1'>{props.alert.msg}</b>
          </div>
        </div>


      }
    </>
    
  )
}

export default Alert

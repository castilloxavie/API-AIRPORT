

export const extractorValidations = (resulValidate) => {
    let errorMessage;
    let data;
    
    const hasError = !resulValidate.success

    if(hasError) errorMessage = JSON.parse(resulValidate.error.message)
    if(!hasError) data = resulValidate.data
    
    return {
      hasError,
      errorMessage,
      data
    }
  } 
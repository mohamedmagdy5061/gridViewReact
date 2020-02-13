const DateFormatter = function formatDate(FormateDate) {
    if (FormateDate) {
      const dateText = new Date(FormateDate).toLocaleString('en-GB', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
      });
      const hourText = new Date(FormateDate).toLocaleString('en-US', {
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric'
      });
      const formatedDate = `${dateText} ${hourText}`;
      return formatedDate;
    }
  
    return FormateDate;
  };

  export {DateFormatter}
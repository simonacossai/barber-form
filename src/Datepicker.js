import React, {useState} from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';


function DateInput({props}) {

  const [selectedDate, setSelectedDate] = useState(null);
  const tomorrow = new Date()
  tomorrow.setDate(new Date().getDate() + 2)
 

  return(
    <DatePicker selected={selectedDate} onChange={date => setSelectedDate(date)}
      dateFormat ="dd-MM-yyyy"
      onSelect={ props(selectedDate)}
      minDate= {tomorrow}
      filterDate= {date=> date.getDay()!==0 && date.getDay()!==1 }
    />
  );
}

export default DateInput;


  
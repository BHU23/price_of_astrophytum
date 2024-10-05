import React, { useState,useEffect } from "react";
import Datepicker from "react-tailwindcss-datepicker";
import { format,parseISO } from "date-fns";

const DateBDPicker = ({ onDateChange, oldDate }) => {
  const [selectedDate, setSelectedDate] = useState({
    startDate: null,
    endDate: null,
  });

  useEffect(() => {
    if (oldDate) {
      const parsedDate = parseISO(oldDate);
      if (!isNaN(parsedDate.getTime())) {
        setSelectedDate({ startDate: parsedDate, endDate: null });
      }
    }
  }, [oldDate]);

  const handleDateSelect = (newDate) => {
    setSelectedDate(newDate);
    if (newDate?.startDate) {
      onDateChange(format(new Date(newDate.startDate), "yyyy-MM-dd"));
    } else {
      onDateChange(null);
    }
  };
  
console.log("Updated selectedDate222:", selectedDate); 
  return (
    <div className="mt-2" >
    <Datepicker
      useRange={false}
      primaryColor={"lime"}
      asSingle={true}
        value={selectedDate}
        startDate={selectedDate.startDate}
        startFrom={selectedDate.startDate}
      maxDate={new Date()}
      onChange={newValue => handleDateSelect(newValue)}
      placeholder="Select Date of Birth"
      inputClassName={`
         min-w-64 h-10 w-full text-sm rounded-lg focus:ring-pear border focus:border-pear p-2.5
            dark:text-white dark:bg-transparent dark:border-gray-600
            bg-gray-50 text-gray-900 border-gray-300 f
      `}
      // renderInput={({ ref }) => (
      //   <input
      //     ref={ref}
      //     readOnly
      //     value={selectedDate ? format(new Date(selectedDate), "MMM dd, yyyy") : ""}
      //     placeholder="Select Date of Birth"
      //     className={`
      //       min-w-64 h-10 w-full text-base rounded-lg focus:ring-pear border focus:border-pear p-2.5
      //       dark:text-white dark:bg-transparent dark:border-gray-600
      //       bg-gray-50 text-gray-900 border-gray-300 
      //     `}
      //   />
      // )}
    />
    </div >
  );
};

export default DateBDPicker;

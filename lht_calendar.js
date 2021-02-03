"use strict";

/*
   New Perspectives on HTML5 and CSS3, 7th Edition
   Tutorial 10
   Tutorial Case

   Author: 
   Date:  

   Filename:   lht_calendar.js  

   Function List:
   createCalendar(calDate)
      Creates the calendar table for the month specified in the
      calDate parameter. The current date is highlighted in 
      the table.

   calCaption(calDate)
      Writes the caption of the calendar table

   calWeekdayRow()
      Writes the weekday title rows in the calendar table

   daysInMonth(calDate)
      Returns the number of days in the month from calDate

   calDays(calDate)
      Writes the daily rows in the calendar table, highlighting calDate
	
*/

// set the date displayed in calendar 

var thisDay = new Date();

//write the calendar data to the element with the id of calendar

document.getElementById("calendar").innerHTML = createCalendar(thisDay);

// Function definition to generate the calendar table

function createCalendar(calDate) {
   var calendarHTML = "<table id= 'calendar_table'>";
   calendarHTML += calCaption(calDate);
   calendarHTML += calWeekdayRow();
   calendarHTML += calDays(calDate);
   calendarHTML += "</table"; 
   return calendarHTML;

}

// Function definition to erite the calendar caption
function calCaption(calDate) {
   // monthName array contains list of month names
   var monthName =  ["January", "Febuary", "March", "April", "May", "June", "July", "August", "September", "October", "November", "Decenber"];
   //determine the current month from calDate value
   var thisMonth = calDate.getMonth();

   // determine the current year from calDate value 
   var thisYear = calDate.getFullYear();

   //build a string for <caption> element and return that string 
   return "<caption>" + monthName[thisMonth] + "" + thisYear + "</caption>"
}


//function to write a table row of weekday abbreviations 
function calWeekdayRow() {
   // aray of the weekday abbreviations 
   var dayName = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT" ];
   var rowHTML = "<tr>";
   // loop through the dayName building <th> emlements for the row 
   for(var i = 0; i < dayName.length; i++) {
      rowHTML += "<th class='calendar_weekdays'>"
      + dayName[i] + "</th>";
   }//end of for loop

   rowHTML += "</tr>";
   return rowHTML;
}



// function to calculate the number of days in the month 
function daysInMonth(calDate) {
   // array of days in each month 
   var dayCount = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    // extract the four digit year and month value 
    var thisYear = calDate.getFullYear();
    var thisMonth = calDate.getMonth();

    // revise the days in febuary for leap years 
    if(thisYear % 4 === 0) {
      if((thisYear % 100 != 0) || (thisYear % 400 === 0)) {
         dayCount[1] = 29;
      }
    }

    // return the number of days for the current month
    return dayCount[thisMonth];

}

// function to write table data for each day of the month 
function calDays(calDate) {
   // determine the starting day of the month 
   var day = new Date(calDate.getFullYear(), calDate.getMonth(), 1);
   var weekDay = day.getDay();   
   // write blank cells preceeding the starting day 
   var htmlCode = "<tr>"; 
   for(var i = 0; i < weekDay; i++) {
   htmlCode += "<td></td>";
   }

   // write the cells for each day of the month 
   var totalDays = daysInMonth(calDate);
   var highlightDay = calDate.getDate();

   for(var i = 1; i <= totalDays; i ++) {
      day.setDate(i);
      weekDay = day.getDay();

      // Lets see if that week day is sunday if so , we need a new <tr> element 
      if(weekDay === 0) {
         htmlCode += "<tr>";
      }

      // check to see if the counter is up to the highlightDay 
      if(i === highlightDay) {
         htmlCode += "<td class='calendar_dates' id='calendar_today'>" + i + dayEvent[i] + "</td>"
      } else {
      // if its not sunday just continue with a <td> element
      htmlCode += "<td class='calendar_dates'>" + i + dayEvent[i] +"</td>"
      }

      // before we loop, lets see if we're at saturday if so, we need a closing </tr> tag
      if(weekDay === 6) {
         htmlCode += "</tr>";
      }

   } //end of for loop

return htmlCode;


}
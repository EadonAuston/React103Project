export const testPassword = (str, name, parent) => {
   let answer = !! str.match(/[!@#$%^&*()_]/) && !! str.match(/[A-Z]/) && !! str.match(/[a-z]/) && !! str.match(/[0-9]/) && str.length > 7 && str.length < 21 ?
   parent.setState({[`${name}`] : true}) : parent.setState({[`${name}`] : false});
   return answer;
}

export const matchPasswords = (createPassword, confirmPassword, name, parent) => {
   let result = (createPassword === confirmPassword) ? parent.setState({[`${name}`] : true}) : parent.setState({[`${name}`] : false});
   return result;
}

export const validate = (str, name, parent, regex) => {
   let result = !! str.match(regex) ? parent.setState({[`${name}`] : true}) : parent.setState({[`${name}`] : false});
   // console.log(!! str.match(regex))
   return result;
}


export const validateStr = (value) => {
   if (value) {
      if (/(^[A-Z]\D+)$/g.test(value)) {
         return undefined
      } else {
         return 'Alphabetical Letters only and must start with a capital';
      } 
   } else {
      return undefined;
   }
}

export const validateEmail = (value) => {
   if (value) {
      if (/\w+[@]\w+\.(com|net|org|edu|info|gov)/g.test(value)) {
         return undefined
      } else {
         return 'Must have letters before and after the @ symbol with an email extension at the end';
      } 
   } else {
      return undefined;
   }
}

export const validatePassword = (value) => {
   if (value) {
      if (/[!@#$%^&*()_]/g.test(value) && /[A-Z]/g.test(value) && /[a-z]/g.test(value) && /[0-9]/g.test(value) && value.length > 7 && value.length < 21) {
         return undefined
      } else {
         return `Password must be 8-20 characters, including: at least one capital letter,
         at least one small letter, one number and one special character -
         ! @ # $ % ^ & * _ +`;
      } 
   } else {
      return undefined;
   }
}

export const validatePasswordsMatch = (value, value2) => {
   if (value, value2){
      if (value === value2) {
         return undefined;
      } else {
         return 'These passwords do not match. Make sure they meet the criteria and are identical'
      }
   }
}

export const validatePostCode = (value) => {
   if (value) {
      if (/^(\d+)$/g.test(value)) {
         return undefined
      } else {
         return 'You must type in positive numbers only';
      } 
   } else {
      return undefined;
   }
}

export const validatePhoneNumber = (value) => {
   if (value) {
      if (/[0-9]{10}$/g.test(value)) {
         return undefined
      } else {
         return 'The phone number should only contain 10 numbers';
      } 
   } else {
      return undefined;
   }
}
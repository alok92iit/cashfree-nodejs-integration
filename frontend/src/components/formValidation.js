export const form =document.getElementById("mainForm")

form({
    on: 'blur',
    fields: {
      empty: {
        identifier  : 'empty',
        rules: [
          {
            type   : 'empty',
            prompt : 'Please enter a value'
          }
        ]
      },
     
    }
  })
const fs = require('fs')
const chalk = require('chalk')

const getNotes =  () => {
    return 'Your notes...'
}

const addNote =  (title, body) => {
    const notes = loadNotes()
    const duplicateNotes = notes.filter( note =>  note.title === title)

    if (duplicateNotes.length === 0) {
        notes.push({
            title: title,
            body: body
        })
        saveNotes(notes)
        console.log('New note added!')
    } else {
        console.log('Note title taken!')
    }
}

const saveNotes =  (notes) =>  {
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json', dataJSON)
}

const loadNotes =  () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)
    } catch (e) {
        return []
    }
}

//remove notes

const removeNotes = (title) =>{
   
    const notes = loadNotes()
    // console.log(notes)
   const notesLeft =  notes.filter(note => title !== note.title)

    if(notesLeft.length === notes.length){
        console.log(chalk.red.inverse('No Note found'))
    }
    else{

        saveNotes(notesLeft)
        console.log(chalk.green.inverse('Note Removed Successfully'))

    }
}
const listNotes = () =>{
    const notes = loadNotes()
    notes.forEach((note)=>{
        console.log(chalk.green.inverse(note.title),'\n')
    })
}

const readNote = (title) => {

    const notes = loadNotes()
    const read = notes.filter(note => note.title == title)
    // console.log(read)
    if(read.length> 0){
        console.log("Title:",read[0].title,"\n",'Body:',read[0].body) 
    }
    else{
        console.log(chalk.red('no note found'))
    }
   

}

module.exports = {
    getNotes: getNotes,
    addNote: addNote,
    removeNotes: removeNotes,
    listNotes: listNotes,
    readNote: readNote
}
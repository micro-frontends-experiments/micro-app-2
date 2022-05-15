import './App.css';
import {useEffect, useState} from 'react';
import debounce from './helpers/debounce';

function App({resolvers}) {
  const [note, setNote] = useState(null);

  const handleOnClickNote = ({detail}) => {
    resolvers.resolveNotes()
        .then((data) => {
          const note = data.filter((note) => note.id === detail.id)?.[0];
          if (note) {
            setNote(note);
          }
        });
  };

  const updateNote = debounce(() => {
    resolvers.putNote(note)
        .then((data) => console.log(data));
  }, 1000, true);

  const onChange = (event) => {
    setNote((note) => ({...nтote, text: event.target.value}));
    updateNote();
  };

  useEffect(() => {
    window.addEventListener('clickNote', handleOnClickNote);

    return () => window.removeEventListener('clickNote', handleOnClickNote);
  }, [handleOnClickNote]);

  if (!note) return null;

  return (
    <div className="column-1 border-2 h-full rounded-md">
      {<textarea
        value={note.text}
        className=
          "w-full border-none min-h-full resize-none outline-0
          px-2 py-1 rounded-md"
        onChange={onChange}
      />}
    </div>
  );
}

export default App;

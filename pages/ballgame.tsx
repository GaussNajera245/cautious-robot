import { useEffect, useState } from 'react';
import Papa from 'papaparse';

import Head from 'next/head';
import styles from '@/styles/ballgame.module.css';

export default function Home() {
  const [textAreaInput, setTextAreaInput] = useState<string>('');

  const [textBoxes, setTextBoxes] = useState<string[]>([]);
  const [formattedText, setFormattedText] = useState<any>([]);

  function handleInputBoxes(event: any) {
    if (event['key'] !== 'Enter') return;

    let pseudoTextBoxes: Set<string> | string[] = textAreaInput
      .split(',')
      .filter((element) => element !== '')
      .map((i) => i.trim());

    pseudoTextBoxes = new Set([...pseudoTextBoxes]);
    pseudoTextBoxes = Array.from(pseudoTextBoxes);

    setTextBoxes(pseudoTextBoxes);

    const element = document.getElementById('text-area');
    if (element && 'disabled' in element) {
      element.disabled = true;
    }
  }

  function handleForm() {
    const formJSON = textBoxes.map((name) => {


      return { [name]: ( document.getElementById(name) as HTMLInputElement).value };
    });
    const formJSONII = formJSON.reduce((a, b) => ({ ...a, ...b }), {});

    const dataset = [...formattedText, formJSONII];

    setFormattedText(dataset);

    textBoxes.forEach((name) => {
      const element = document.getElementById(name);
      if (element && 'value' in element) {
        element.value = '';
      }
    });
  }

  return (
    <>
      <Head>
        <title>Ball Game Demo</title>
        <meta name="description" content="game created by gnajera" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <table>
          <tbody>
            <tr>
              <td>
                <textarea
                  spellCheck="false"
                  id="text-area"
                  onKeyUp={handleInputBoxes}
                  value={textAreaInput}
                  style={{ color: 'aqua' }}
                  onChange={({ target }) =>
                    setTextAreaInput(target.value.replaceAll('\n', ''))
                  }
                ></textarea>
              </td>
              <td>
                <textarea
                  spellCheck="false"
                  className="csv-text-area"
                  value={Papa.unparse(formattedText)}
                  style={{ color: 'yellow' }}
                  disabled
                ></textarea>
              </td>
            </tr>
            <tr>
              <td>
                <ul>
                  {textBoxes.map((element) => (
                    <li key={element}>
                      <label>{element}:</label>
                      <input type="text" spellCheck="false" id={element} />
                    </li>
                  ))}
                </ul>
                <button onClick={handleForm}>Submit</button>
              </td>
              <td>
                <textarea
                  spellCheck="false"
                  className="json-text-area"
                  value={JSON.stringify(formattedText, undefined, 4)}
                  style={{ color: 'aqua' }}
                  disabled
                ></textarea>
              </td>
            </tr>
          </tbody>
        </table>
      </main>
    </>
  );
}

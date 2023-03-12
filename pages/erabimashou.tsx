import { useEffect, useState } from 'react';

import SVG_Input from '@/components/erabimashou/svg_input';
import SingleDot from '@/components/erabimashou/single-dot';
import Head from 'next/head';

export default function Erabimashou() {
  const [rows, setNewRow] = useState<string[][]>([]);


  return (
    <>
      <Head>
        <title>Guessing Game</title>
        <meta name="description" content="game created by gnajera" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <h1 className="text-3xl font-bold underline">nan desuka</h1>
        {rows.map( (tr, i) => <SingleDot  key={'new-row'+i} staticValues={tr} />   )}

        <hr></hr>

        <SVG_Input  length={5} callback={ (row) => setNewRow(i => ([...i, row])  )}/>
      </main>
    </>
  );
}

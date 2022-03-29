import * as child_process from 'child_process';
import * as path from 'path';

import { EventEmitter } from 'events';

/** A stream of keystates */
export class KeyStream extends EventEmitter {
  constructor() {
    super();

    const keysProcess = child_process.spawn(`${path.join(__dirname, '../bin/keys.exe').replace('app.asar', 'app.asar.unpacked')}`);

    keysProcess.stdout.on('data', (data: any) => {
            try{ 
              const parsed = JSON.parse(data)
              return  this.emit('data', parsed)
             }
             catch{}
    });
    keysProcess.on('close', () => this.emit('error', new Error(`unexpected closure of keys.exe process`)));
  }
}

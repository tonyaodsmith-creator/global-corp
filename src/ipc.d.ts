export {}
declare global { interface Window { api?: { saveGame: (data: string)=>Promise<any>, loadGame: ()=>Promise<any> } } }

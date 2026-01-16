async function cargarDashboard() {
    try {
        const res = await fetch('data_web.json');
        const data = await res.json();

        // Actualizar Fecha
        document.getElementById('fecha-update').innerText = `Actualizado: ${data.Fecha}`;

        // Llenar Órdenes
        const tOrdenes = document.getElementById('tabla-ordenes');
        data.Ordenes.forEach(o => {
            const color = o.Accion === 'COMPRAR' ? 'text-emerald-400' : 'text-rose-400';
            tOrdenes.innerHTML += `
                <tr class="hover:bg-slate-700/30 transition">
                    <td class="p-4 font-bold ${color}">${o.Accion}</td>
                    <td class="p-4 font-mono text-blue-300">${o.Simbolo}</td>
                    <td class="p-4 text-slate-400 text-sm">${o.Nombre}</td>
                    <td class="p-4 text-xs italic">${o.Instruccion}</td>
                    <td class="p-4 text-slate-500">${o.InfoMGC}</td>
                </tr>`;
        });

        // Llenar Portafolio
        const tPort = document.getElementById('tabla-portafolio');
        data.Portafolio.forEach(p => {
            tPort.innerHTML += `
                <tr class="hover:bg-slate-700/30">
                    <td class="p-4 font-bold">${p.Simbolo}</td>
                    <td class="p-4 text-right text-blue-400">${p.Porcentaje}</td>
                    <td class="p-4 text-xs"><span class="px-2 py-1 bg-slate-700 rounded">${p.Estado}</span></td>
                </tr>`;
        });

        // Llenar Historial Anual
        const tHist = document.getElementById('tabla-historico');
        data.Historico.tabla_anual.forEach(h => {
            const retColor = parseFloat(h.Retorno) >= 0 ? 'text-emerald-400' : 'text-rose-400';
            tHist.innerHTML += `
                <tr class="hover:bg-slate-700/30">
                    <td class="p-4 font-bold text-slate-300">${h.Año}</td>
                    <td class="p-4 ${retColor}">${h.Retorno}</td>
                    <td class="p-4 text-rose-500/80">${h.MaxPerdida}</td>
                </tr>`;
        });

    } catch (e) {
        console.error("Error cargando JSON:", e);
    }
}

cargarDashboard();
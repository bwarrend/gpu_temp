#!/usr/bin/env node

const si = require('systeminformation');
const { exec } = require('child_process');


si.graphics()
  .then(gpu_data => {
    console.log("****BWarrend CPU-GPU Temp monitor****");
    let gpunum = 1;
    gpu_data.controllers.forEach(gpu => {
      console.log("------GPU-" + gpunum + " Information------");
      console.log(gpu.model);
      console.log(gpu.vram + " mb VRAM");
      console.log("-----------------------------");
      gpunum++;
    })

    exec('nvidia-smi --query-gpu=temperature.gpu --format=csv,noheader', (err, stdout, stderr) => {
      if (err) {
        console.error("Could not return GPU info.");
        return;
      }
      console.log(stdout[0]+stdout[1] + "\u00B0 C");
      console.log("-----------------------------");
      exec('pause', (err, stdout, stderr) => {
              console.log(stdout);
            });
    });

  })
  .catch(error => console.error(error));


// si.cpu()
//   .then(cpu_data => {
//     console.log("-------CPU Information-------");
//     console.log(cpu_data.manufacturer + " " + cpu_data.brand);
//     console.log(cpu_data.speed + " GHz");
//     console.log("Cores: " + cpu_data.cores);
//     si.cpuTemperature()
//       .then(cpu_temp => {
//         console.log("-----------------------------");
//         console.log(Math.round(cpu_temp.main) + "\u00B0 C");
//         console.log("-----------------------------");
//       });

//     exec('pause', (err, stdout, stderr) => {
//       console.log(stdout);
//     });
//   })
//   .catch(error => console.error(error));
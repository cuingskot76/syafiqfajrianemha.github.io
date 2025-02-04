// simulasi-nilai-skripsi__nilai-pertama
const nilaiPertama = [
  {
    title: "Simulasi Nilai Skripsi",
    subTitle: ["No", "Komponen Penilaian ", "Skor", "Bobot", "Bobot x Skor"],
    data: [
      {
        no: "1",
        komponenPenilaian:
          "Ketepatan dan kedisiplinan selama pelaksanaan bimbingan skripsi",
        bobot: 50,
      },
      {
        no: "2",
        komponenPenilaian:
          "Kemauan dan tingkat keseriusan dalam menyelesaikan skripsi",
        bobot: 50,
      },
    ],
  },
];
// simulasi-nilai-skripsi__nilai-kedua
const nilaiKedua = [
  {
    subTitle: [
      "No",
      "Komponen Penilaian",
      "Skor Penguji",
      "Rata-rata",
      "Bobot",
      "Bobot x Skor",
    ],
    data: [
      {
        no: "1",
        komponenPenilaian: "Orisinalitas dan kebaruan topik penelitian",
        bobot: 15,
        skorPenguji: ["penguji 1", "penguji 2", "penguji 3"],
      },
      {
        no: "2",
        komponenPenilaian:
          "RELEVANSI LOGIS ANTARA JUDUL, MASALAH, TEORI, METODE DAN HASIL PENELITIAN",
        bobot: 20,
        skorPenguji: ["penguji 1", "penguji 2", "penguji 3"],
      },
      {
        no: "3",
        komponenPenilaian: "TATA TULIS",
        bobot: 20,
        skorPenguji: ["penguji 1", "penguji 2", "penguji 3"],
      },
      {
        no: "4",
        komponenPenilaian: "PENGUASAAN MATERI PENELITIAN",
        bobot: 20,
        skorPenguji: ["penguji 1", "penguji 2", "penguji 3"],
      },
      {
        no: "5",
        komponenPenilaian: "PRESENTASI DAN ARGUMENTASI JAWABAN",
        bobot: 15,
        skorPenguji: ["penguji 1", "penguji 2", "penguji 3"],
      },
      {
        no: "6",
        komponenPenilaian: "PENAMPILAN SAAT PRESENTASI",
        bobot: 10,
        skorPenguji: ["penguji 1", "penguji 2", "penguji 3"],
      },
    ],
    jumlahPenguji: ["1", "2", "3"],
  },
];

const onHandleInput = (e) => {
  const { name, value } = e.target;
  // form__2
  const testersScore = document.querySelectorAll("#skorPenguji");
  const averageScores = document.querySelectorAll("#rataRata");
  const inputBobotxSkor__2 = document.querySelectorAll("#bobotxSkor");
  const totalNilaiForm2 = document.querySelector("#totalNilai");

  let totalTesterScore = 0;
  let totalAverage = 0;
  // let totalForm2 = 0;
  const jumlahSkorPenguji = nilaiKedua[0].jumlahPenguji.length;

  testersScore.forEach((skor) => {
    if (skor.name === name) {
      totalTesterScore += parseInt(skor.value);
      // totalTesterScore += skor.value;
      // totalTesterScore += parseFloat(skor.value);

      if (skor.value > 100) {
        skor.value = null;
        return Swal.fire({
          title: "Error!",
          text: "Nilai maksimal 100",
          icon: "error",
          confirmButtonText: "Ok",
        });
      }

      // count average
      averageScores.forEach((rata) => {
        if (rata.name === name) {
          rata.value = (totalTesterScore / jumlahSkorPenguji).toFixed(2);
          totalAverage = totalTesterScore / jumlahSkorPenguji;
        }
      });
    }
  });

  let totalArr = [];
  inputBobotxSkor__2.forEach((bobot, i) => {
    if (bobot.name === name) {
      const getBobotScore = nilaiKedua[0].data[i].bobot;
      const bobotResult = parseInt(
        (totalAverage / getBobotScore) * getBobotScore
      );
      // const bobotResult = (totalAverage / getBobotScore) * getBobotScore;
      // if you want to get 2 decimal
      // bobot.value = bobotResult.toFixed(2);
      bobot.value = bobotResult;
      // total form 2
    }
    // totalForm2 += bobot.value;
    totalArr.push(bobot.value);
  });
  // get total form 2
  const intArr = totalArr.map(Number);
  const filteredArr = intArr.filter((value) => value);
  const sum = filteredArr.reduce((acc, cur) => acc + cur, 0);

  totalNilaiForm2.value = sum;

  // form__1
  const inputBobotxSkor = document.querySelectorAll("#bobotxskor");
  const scores = document.querySelectorAll("#skor");

  const getUserInputValue = (value / 50) * 50;
  let totalForm1 = 0;
  let hasilNew = 0;

  inputBobotxSkor.forEach((skor) => {
    if (skor.name === name) {
      skor.value = getUserInputValue;
      totalForm1 += parseFloat(skor.value);
      if (totalForm1 > 50) {
        // reset all input when the user input empty
        scores.forEach((skorInput) => {
          // skor input value
          skorInput.value = null;
        });
        // reset all input when the user input empty
        // bobot x skor value
        inputBobotxSkor.forEach((skor) => {
          skor.value = null;
        });
        return Swal.fire({
          title: "Error!",
          text: "Nilai maksimal 50",
          icon: "error",
          confirmButtonText: "Ok",
        });
      } else if (isNaN(value) || value === "" || value === undefined) {
        Swal.fire({
          title: "Error!",
          text: "Nilai tidak boleh kosong",
          icon: "error",
          confirmButtonText: "Ok",
        });
      } else {
        inputBobotxSkor.forEach((result) => {
          if (result.name === name) {
            result.value = getUserInputValue;
          }
          hasilNew += parseInt(result.value);
        });
      }
      // get total bobot x skor
      const totalBobotSkor = document.getElementById("totalBobotxSkor");
      totalBobotSkor.value = hasilNew;
    }
  });

  // get nilai akhir
  const getNilaiAkhhir = document.getElementById("nilaiAkhir");

  const totalNilaiPertama = (totalForm1 * 40) / 100;
  const totalNilaiKedua = (sum * 60) / 100;
  getNilaiAkhhir.value = totalNilaiPertama + totalNilaiKedua;
  // get nilai huruf
  const nilaiHuruf = document.getElementById("nilaiHuruf");
  const nilaiAkhir = totalNilaiPertama + totalNilaiKedua;

  if (nilaiAkhir >= 100) {
    nilaiHuruf.innerHTML = "A+";
    getNilaiAkhhir.value = 100;
  } else if (nilaiAkhir >= 86 && nilaiAkhir <= 100) {
    nilaiHuruf.innerHTML = "A";
  } else if (nilaiAkhir >= 81 && nilaiAkhir < 86) {
    nilaiHuruf.innerHTML = "A-";
  } else if (nilaiAkhir >= 76 && nilaiAkhir < 81) {
    nilaiHuruf.innerHTML = "B+";
  } else if (nilaiAkhir >= 71 && nilaiAkhir < 76) {
    nilaiHuruf.innerHTML = "B";
  } else if (nilaiAkhir >= 66 && nilaiAkhir < 71) {
    nilaiHuruf.innerHTML = "B-";
  } else if (nilaiAkhir >= 61 && nilaiAkhir < 66) {
    nilaiHuruf.innerHTML = "C+";
  } else if (nilaiAkhir >= 56 && nilaiAkhir < 61) {
    nilaiHuruf.innerHTML = "C";
  } else if (nilaiAkhir >= 41 && nilaiAkhir < 56) {
    nilaiHuruf.innerHTML = "D";
  } else {
    nilaiHuruf.innerHTML = "E";
  }
};

// ! first form
nilaiPertama.forEach((result) => {
  const form = document.querySelector(".form__pertama");
  form.classList.add("form__pertama");

  const table = document.createElement("table");
  const thead = document.createElement("thead");
  const subTitleContent = document.createElement("tr");

  // sub title
  result.subTitle.forEach((title) => {
    const subTitleElement = document.createElement("th");
    subTitleElement.innerHTML = title;
    subTitleContent.appendChild(subTitleElement);
    thead.appendChild(subTitleContent);
    table.appendChild(thead);
  });

  // table body
  const tBody = document.createElement("tbody");
  result.data.forEach((data) => {
    const tr = document.createElement("tr");

    const noElement = document.createElement("td");
    noElement.textContent = data.no;
    tr.appendChild(noElement);

    const komponenPenilaianElement = document.createElement("td");
    komponenPenilaianElement.textContent = data.komponenPenilaian;
    tr.appendChild(komponenPenilaianElement);

    // skor input
    const skorElement = document.createElement("td");
    const skorElementInput = document.createElement("input");

    skorElementInput.setAttribute("type", "number");
    skorElementInput.setAttribute("autocomplete", "off");
    skorElementInput.setAttribute("id", "skor");
    skorElementInput.setAttribute("name", data.no);
    skorElementInput.setAttribute("min", "0");
    skorElementInput.setAttribute("max", "50");
    skorElementInput.setAttribute("placeholder", "0");
    skorElementInput.addEventListener("input", onHandleInput);
    skorElementInput.classList.add("input__content");

    skorElement.appendChild(skorElementInput);
    tr.appendChild(skorElement);

    // bobot x skor input
    const bobotElement = document.createElement("td");
    bobotElement.textContent = data.bobot;
    tr.appendChild(bobotElement);

    const bobotxskorElement = document.createElement("td");
    const bobotxskorElementInput = document.createElement("input");
    bobotxskorElementInput.setAttribute("type", "number");
    bobotxskorElementInput.setAttribute("disabled", "disabled");
    bobotxskorElementInput.setAttribute("id", "bobotxskor");
    bobotxskorElementInput.setAttribute("name", data.no);
    bobotxskorElementInput.setAttribute("min", "0");
    bobotxskorElementInput.setAttribute("max", "4");
    // bobotxskorElementInput.setAttribute("value", "0");
    bobotxskorElementInput.setAttribute("placeholder", "0");
    bobotxskorElementInput.classList.add("input__content");
    bobotxskorElement.appendChild(bobotxskorElementInput);
    tr.appendChild(bobotxskorElement);

    tBody.appendChild(tr);
    table.appendChild(tBody);
  });

  const totalTr = document.createElement("tr");
  const totalTd = document.createElement("td");
  const totalBobot = document.createElement("td");
  const totalBobotxSkor = document.createElement("td");
  const totalBobotxSkorInput = document.createElement("input");

  totalTd.setAttribute("colspan", "3");
  totalTd.textContent = "Total";
  const total = result.data.reduce((acc, cur) => acc + cur.bobot, 0);
  totalBobot.textContent = total;
  totalBobotxSkorInput.setAttribute("type", "number");
  totalBobotxSkorInput.setAttribute("disabled", "disabled");
  totalBobotxSkorInput.setAttribute("id", "totalBobotxSkor");
  totalBobotxSkorInput.setAttribute("name", "totalBobotxSkor");
  totalBobotxSkorInput.setAttribute("min", "0");
  totalBobotxSkorInput.setAttribute("max", "4");
  totalBobotxSkorInput.setAttribute("value", "0");
  totalBobotxSkorInput.classList.add("input__content");
  totalBobotxSkor.appendChild(totalBobotxSkorInput);

  totalTr.appendChild(totalTd);
  totalTr.appendChild(totalBobot);
  totalTr.appendChild(totalBobotxSkor);
  tBody.appendChild(totalTr);
  form.appendChild(table);
});

// ! second form
nilaiKedua.forEach((result) => {
  const form = document.querySelector(".form__kedua");
  form.classList.add("form__kedua");

  const table = document.createElement("table");
  const thead = document.createElement("thead");
  const subTitleContent = document.createElement("tr");
  const addScorPengujiContent = document.createElement("tr");

  // sub title
  result.subTitle.forEach((subTitle) => {
    const subTitleElement = document.createElement("th");
    subTitleElement.setAttribute("rowspan", "2");
    if (subTitle === "Skor Penguji") {
      subTitleElement.setAttribute("colspan", "3");
      subTitleElement.removeAttribute("rowspan");
    }
    subTitleElement.textContent = subTitle;
    subTitleContent.appendChild(subTitleElement);
  });

  // skor penguji
  result.jumlahPenguji.forEach((jumlahPenguji) => {
    const addSkorPengujiContent = document.createElement("th");
    addSkorPengujiContent.textContent = jumlahPenguji;
    addScorPengujiContent.appendChild(addSkorPengujiContent);
  });

  thead.appendChild(subTitleContent);
  thead.appendChild(addScorPengujiContent);

  const tBody = document.createElement("tbody");
  result.data.forEach((data) => {
    const tr = document.createElement("tr");

    // no
    const noElement = document.createElement("td");
    noElement.textContent = data.no;
    tr.appendChild(noElement);

    // komponen penilaian
    const komponenPenilaianElement = document.createElement("td");
    komponenPenilaianElement.textContent = data.komponenPenilaian;
    tr.appendChild(komponenPenilaianElement);

    // skor penguji
    data.skorPenguji.forEach((sp) => {
      const skorPengujiElement = document.createElement("td");
      const skorPengujiElementInput = document.createElement("input");
      skorPengujiElementInput.setAttribute("type", "number");
      skorPengujiElementInput.setAttribute("autocomplete", "off");
      skorPengujiElementInput.setAttribute("id", "skorPenguji");
      skorPengujiElementInput.setAttribute("name", `${data.no} x `);
      skorPengujiElementInput.setAttribute("min", "0");
      skorPengujiElementInput.setAttribute("max", "4");
      skorPengujiElementInput.setAttribute("placeholder", "0");
      skorPengujiElementInput.classList.add("input__content");
      skorPengujiElementInput.addEventListener("input", onHandleInput);
      skorPengujiElement.appendChild(skorPengujiElementInput);
      tr.appendChild(skorPengujiElement);
    });

    const rataRataElement = document.createElement("td");
    const rataRataElementInput = document.createElement("input");
    rataRataElementInput.setAttribute("type", "number");
    rataRataElementInput.setAttribute("autocomplete", "off");
    rataRataElementInput.setAttribute("disabled", "disabled");
    rataRataElementInput.setAttribute("id", "rataRata");
    rataRataElementInput.setAttribute("name", `${data.no} x `);
    rataRataElementInput.setAttribute("untuk", `${data.no}`);
    rataRataElementInput.setAttribute("min", "0");
    rataRataElementInput.setAttribute("max", "4");
    rataRataElementInput.setAttribute("value", "0");
    rataRataElementInput.classList.add("input__content");
    rataRataElementInput.addEventListener("input", onHandleInput);
    rataRataElement.appendChild(rataRataElementInput);
    tr.appendChild(rataRataElement);

    // bobot
    const bobotElement = document.createElement("td");
    bobotElement.textContent = data.bobot;
    tr.appendChild(bobotElement);

    // bobot x skor
    const bobotxSkorElement = document.createElement("td");
    const bobotxSkorElementInput = document.createElement("input");
    bobotxSkorElementInput.setAttribute("type", "number");
    bobotxSkorElementInput.setAttribute("disabled", "disabled");
    bobotxSkorElementInput.setAttribute("autocomplete", "off");
    bobotxSkorElementInput.setAttribute("id", "bobotxSkor");
    bobotxSkorElementInput.setAttribute("name", `${data.no} x `);
    bobotxSkorElementInput.setAttribute("min", "0");
    bobotxSkorElementInput.setAttribute("max", "4");
    // bobotxSkorElementInput.setAttribute("value", "0");
    bobotxSkorElementInput.setAttribute("placeholder", "0");
    bobotxSkorElementInput.classList.add("input__content");
    bobotxSkorElement.appendChild(bobotxSkorElementInput);
    tr.appendChild(bobotxSkorElement);

    tBody.appendChild(tr);
    table.appendChild(tBody);
  });

  // total
  const totalTr = document.createElement("tr");
  const totalTd = document.createElement("td");
  const totalBobotxSkor = document.createElement("td");
  const totalBobotxSkorInput = document.createElement("input");

  totalTd.setAttribute("colspan", "7");
  totalTd.textContent = "Total";
  totalBobotxSkorInput.setAttribute("type", "number");
  totalBobotxSkorInput.setAttribute("disabled", "disabled");
  totalBobotxSkorInput.setAttribute("id", "totalNilai");
  totalBobotxSkorInput.setAttribute("name", "totalNilai");
  totalBobotxSkorInput.setAttribute("min", "0");
  // totalBobotxSkorInput.setAttribute("placeholder", "0");
  totalBobotxSkorInput.setAttribute("max", "4");
  totalBobotxSkorInput.setAttribute("value", "0");

  totalBobotxSkorInput.classList.add("input__content");
  totalBobotxSkor.appendChild(totalBobotxSkorInput);

  totalTr.appendChild(totalTd);
  totalTr.appendChild(totalBobotxSkor);

  tBody.appendChild(totalTr);
  form.appendChild(table);

  // nilai akhir
  const nilaiAkhirTr = document.createElement("tr");
  const nilaiAkhirTd = document.createElement("td");
  const nilaiAkhirskor = document.createElement("td");
  const nilaiAkhirInput = document.createElement("input");

  nilaiAkhirTd.setAttribute("colspan", "7");
  nilaiAkhirTd.textContent = "Nilai Akhir";
  nilaiAkhirInput.setAttribute("type", "number");
  nilaiAkhirInput.setAttribute("disabled", "disabled");
  nilaiAkhirInput.setAttribute("autocomplete", "off");
  nilaiAkhirInput.setAttribute("id", "nilaiAkhir");
  nilaiAkhirInput.setAttribute("name", "nilaiAkhir");
  nilaiAkhirInput.setAttribute("min", "0");
  nilaiAkhirInput.setAttribute("max", "4");
  nilaiAkhirInput.setAttribute("value", "0");
  nilaiAkhirInput.classList.add("input__content");
  nilaiAkhirskor.appendChild(nilaiAkhirInput);

  nilaiAkhirTr.appendChild(nilaiAkhirTd);
  nilaiAkhirTr.appendChild(nilaiAkhirskor);

  tBody.appendChild(nilaiAkhirTr);
  form.appendChild(table);

  // nilai huruf
  const nilaiHurufTr = document.createElement("tr");
  const nilaiHurufTd = document.createElement("td");
  const nilaiHurufskor = document.createElement("td");

  nilaiHurufTd.setAttribute("colspan", "7");
  nilaiHurufTd.textContent = "Nilai Huruf";
  nilaiHurufskor.setAttribute("id", "nilaiHuruf");
  nilaiHurufskor.classList.add("nilai-huruf");

  nilaiHurufTr.appendChild(nilaiHurufTd);
  nilaiHurufTr.appendChild(nilaiHurufskor);

  tBody.appendChild(nilaiHurufTr);
  form.appendChild(table);

  table.appendChild(thead);
  form.appendChild(table);
});

// simulasi-audit__nilai-pertama
const nilaiKetiga = [
  {
    subTitle: ["No", "Indikator", "Rubrik", "Keterangan"],
  },
  {
    data: [
      {
        no: 1,
        indikator: [
          "Presentase dosen yang melakukan kegiatan awal perkuliahan(KAP)",
          {
            subIndikator: [
              {
                1: "Penyampaian sub-cpmk",
                2: " Penyampaian indikator pembelajaran",
                3: "Pemeriksaan kehadiran mahasiswa",
              },
            ],
          },
        ],
        rubrik: [
          {
            skor: 4,
            uraian: "KAP DOSEN >= 80%",
          },
          {
            skor: 3,
            uraian: "60% <= KAP DOSEN < 80%",
          },
          {
            skor: 2,
            uraian: "40% <= KAP DOSEN < 60%",
          },
          {
            skor: 1,
            uraian: "10% <= KAP DOSEN < 40%",
          },
          {
            skor: 0,
            uraian: "KAP DOSEN < 10%",
          },
        ],
      },
      {
        no: 2,
        indikator: [
          "Presentase dosen yang memenuhi karakteristik proses pembelajaran yang bersifat interkatif meliputi kegiatan interksi yang konstruktif antara:",
          {
            subIndikator: [
              {
                1: "Mahasiswa dengan dosen",
                2: "Mahasiswa dengan mahasiswa",
                3: "Mahasiswa dengan sumber belajar",
              },
            ],
          },
        ],
        rubrik: [
          {
            skor: 4,
            uraian: "DOSEN INTERAKTIF >= 80%",
          },
          {
            skor: 3,
            uraian: "60% <= DOSEN INTERAKTIF < 80%",
          },
          {
            skor: 2,
            uraian: "40% <= DOSEN INTERAKTIF < 60%",
          },
          {
            skor: 1,
            uraian: "10% <= DOSEN INTERAKTIF < 40%",
          },
          {
            skor: 0,
            uraian: "DOSEN INTERAKTIF < 10%",
          },
        ],
      },
      {
        no: 3,
        indikator: [
          "Presentase dosen yang memenuhi karakteristik proses pembelajaran yang bersifat holistik yang meliputi",
          {
            subIndikator: [
              {
                1: "Belajar secara utuh",
                2: "Lingkungan belajar yang berintegritas",
                3: "Mewujudkan pribadi berintegritas antara individu dan sosial",
                4: "Fokus dalam belajar",
                5: "Mengembangkan mahasiswa sesuai potensi",
              },
            ],
          },
        ],
        rubrik: [
          {
            skor: 4,
            uraian: "DOSEN HOLISTIK >= 80%",
          },
          {
            skor: 3,
            uraian: "60% <= DOSEN HOLISTIK < 80%",
          },
          {
            skor: 2,
            uraian: "40% <= DOSEN HOLISTIK < 60%",
          },
          {
            skor: 1,
            uraian: "10% <= DOSEN HOLISTIK < 40%",
          },
          {
            skor: 0,
            uraian: "DOSEN HOLISTIK < 10%",
          },
        ],
      },
      {
        no: 4,
        indikator: [
          "Presentase dosen yang memenuhi karakteristik proses pembelajaran yang bersifat integratif yang meliputi",
          {
            subIndikator: [
              {
                1: "Menggunakan pendekatan antar mata kuliah",
                2: "Menggabungkan beberapa mata kuliah",
                3: "Menentukan ketrampilan, konsep dan sikap dalam beberapa mata kuliah",
              },
            ],
          },
        ],
        rubrik: [
          {
            skor: 4,
            uraian: "DOSEN INTEGRATIF >= 80%",
          },
          {
            skor: 3,
            uraian: "60% <= DOSEN INTEGRATIF < 80%",
          },
          {
            skor: 2,
            uraian: "40% <= DOSEN INTEGRATIF < 60%",
          },
          {
            skor: 1,
            uraian: "10% <= DOSEN INTEGRATIF < 40%",
          },
          {
            skor: 0,
            uraian: "DOSEN INTEGRATIF < 10%",
          },
        ],
      },
    ],
    subRubrik: ["skor", "uraian"],
    subKeterangan: ["input nilai", "skor"],
  },
];

// ! third form
nilaiKetiga.forEach((result) => {
  const form = document.querySelector(".form__pertama-simulasi-audit");
  form.classList.add("form__ketiga");

  // const table = document.createElement("table");
  // const thead = document.createElement("thead");
  // const subTitleContent = document.createElement("tr");
  // const addScorPengujiContent = document.createElement("tr");

  const table = document.querySelector(".table");
  const thead = document.querySelector(".thead");
  const tbody = document.createElement("tbody");
  const tr = document.querySelector(".tr");
  const addRubrikandKeteranganTr = document.createElement("tr");
  // const addKeteranganTr = document.createElement("tr");

  // handle multiple table
  if (!table) {
    table = document.createElement("table");
    thead = document.createElement("thead");
    tr = document.createElement("tr");
  }
  // table.innerHTML = "";

  // sub title
  result?.subTitle?.forEach((subTitle) => {
    const subTitleElement = document.createElement("th");
    subTitleElement.setAttribute("rowspan", "2");
    // if (subTitle === "Keterangan" || subTitle === "Rubrik") {
    //   subTitleElement.setAttribute("colspan", "3");
    //   subTitleElement.removeAttribute("rowspan");
    // }
    if (subTitle === "Rubrik") {
      subTitleElement.setAttribute("colspan", "2");
      subTitleElement.removeAttribute("rowspan");
    } else if (subTitle === "Keterangan") {
      subTitleElement.setAttribute("colspan", "3");
      subTitleElement.removeAttribute("rowspan");
    }

    subTitleElement.textContent = subTitle;
    tr.appendChild(subTitleElement);
  });

  // sub rubrik
  result?.subRubrik?.forEach((subRubrik) => {
    const addSkorPengujiContent = document.createElement("th");
    addSkorPengujiContent.textContent = subRubrik;
    addRubrikandKeteranganTr.appendChild(addSkorPengujiContent);
  });

  // sub keterangan
  result?.subKeterangan?.forEach((subKeterangan) => {
    const addSkorPengujiContent = document.createElement("th");
    addSkorPengujiContent.textContent = subKeterangan;
    addRubrikandKeteranganTr.appendChild(addSkorPengujiContent);
  });

  thead.appendChild(tr);
  thead.appendChild(addRubrikandKeteranganTr);

  // body
  result?.data?.forEach((res) => {
    const bodyTr = document.createElement("tr");
    // add nomor
    const addNomorContent = document.createElement("tr");
    const addNomor = document.createElement("td");
    // addNomor.setAttribute("rowspan", "5");
    addNomor.textContent = res.no;
    bodyTr.appendChild(addNomor);

    // add indikator
    const addIndikatorContent = document.createElement("tr");
    const addIndikator = document.createElement("td");
    // addIndikator.setAttribute("rowspan", "5");
    // res.indikator.forEach((newRes, i) => {
    //   const getSubIndikator = newRes.subIndikator?.[0]?.[i];
    //   console.log(getSubIndikator);
    // });
    const x = res.indikator?.[1]?.subIndikator;
    console.log(x);

    tbody.appendChild(bodyTr);
    table.appendChild(tbody);
  });

  table.appendChild(thead);
  form.appendChild(table);
});

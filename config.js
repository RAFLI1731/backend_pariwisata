const requestResponse = {
  gagal: (pesan) => {
    return {
      code: 404,
      sukses: false,
      pesan: pesan,
    };
  },
  berhasil: (pesan) => {
    return {
      code: 200,
      sukses: true,
      pesan: pesan,
    };
  },
  kesalahan: {
    sukses: false,
    pesan: "terjadi kesahan server",
  },
  suksesLogin: (data) => {
    return {
      code: 200,
      sukses: true,
      pesan: "Berhasil Login",
      data: data,
    };
  },
  suksesWithData: (data) => {
    return {
      code: 200,
      sukses: true,
      pesan: "Berhasil Memuat Data",
      data: data,
    };
  },
};
module.exports = { requestResponse };

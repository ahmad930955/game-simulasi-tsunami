class karyawan :
  def __init__(self, nama, gaji_pokok):
    self.nama = nama
    self.gaji_pokok = gaji_pokok

  def tampilkan_info(self):
    print("nama   :", self.nama)
    print("gaji pokok :", self.gaji_pokok)

class manager(karyawan):
  def __init__(self, nama, gaji_pokok, tunjangan):
     super().__init__(nama, gaji_pokok)
     self.tunjangan = tunjangan

  def tampilkan_info(self):
    total_gaji = self.gaji_pokok + self.tunjangan
    print("----gaji manager----")
    print("nama  :", self.nama)
    print("gaji  :", self.gaji_pokok)
    print("tunjangan :", self.tunjangan)
    print("total gaji:", total_gaji)
    print()
    

class programmer(karyawan):
  def __init__(self, nama, gaji_pokok, bonus):
     super().__init__(nama, gaji_pokok)
     self.bonus = bonus

  def tampilkan_info(self):
    total_gaji = self.bonus + self.gaji_pokok
    print("----gaji programmer---")
    print("nama   :", self.nama)
    print("gaji pokok: ", self.gaji_pokok)
    print("bonus  :", self.bonus)
    print("total gaji :", total_gaji)
    


gaji_manager = manager("prabowo", 160000000, 800000000)
gaji_programmer = programmer("Gibran", 180000000, 240000000)

gaji_manager.tampilkan_info()
gaji_programmer.tampilkan_info()




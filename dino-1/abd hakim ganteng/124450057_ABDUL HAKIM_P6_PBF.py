#SOAL 1
import csv
header = ['id_pinjam', 'nama_peminjam', 'judul_buku', 'tanggal pinjam', 'status']
rows = [
    ['P001','Andi Saputra', 'Belajar Python', '2024-01-10', 'aktif'],
    ['P002', 'Budi Laksono', 'Data Science Dasar', '2024-01-12', 'selesai'],
    ['P003', 'Citra Maya', 'Belajar Python', '2024-01-15', 'aktif'],
    ['P004', 'Dewi Ratna', 'Algoritma Pemrograman', '2024-01-17', 'aktif'],
    ['P005', 'Eko Prasetyo', 'Machine Learning', '2024-01-18', 'selesai'],
    ['P006', 'Fani Aulia', 'Belajar Python', '2024-01-20', 'aktif'],
    ['P007', 'Gilang Ramadhan', 'Data Science Dasar', '2024-01-21', 'selesai'],
    ['P008', 'Hana Pertiwi', 'Struktur Data', '2024-01-22', 'aktif'],
]

with open('peminjaman.csv', 'w', newline='', encoding='utf-8') as f:
    writer= csv.writer(f)
    writer.writerow(header)
    writer.writerows(rows)

print("File 'peminjaman.csv' berhasil dibuat!")


# perpustakaan.py
import csv
from typing import NamedTuple, List
from collections import Counter

class Peminjaman(NamedTuple):
    id_pinjam: str
    nama_peminjam: str
    judul_buku: str
    tanggal_pinjam: str
    status: str

def muat_peminjaman(filepath: str) -> List[Peminjaman]:
    data = []
    with open(filepath, newline='', encoding='utf-8-sig') as f:
        reader = csv.DictReader(f)
        reader.fieldnames = [h.strip() for h in reader.fieldnames]
        for row in reader:
            data.append(Peminjaman(
                id_pinjam=row['id_pinjam'].strip(),
                nama_peminjam=row['nama_peminjam'].strip(),
                judul_buku=row['judul_buku'].strip(),
                tanggal_pinjam=row['tanggal pinjam'].strip(), 
                status=row['status'].strip()
            ))
    return data

def filter_aktif(data: List[Peminjaman]) -> List[Peminjaman]:
    return [p for p in data if p.status == 'aktif']

def buku_terpopuler(data: List[Peminjaman]) -> str:
    judul_list = [p.judul_buku for p in data]
    return Counter(judul_list).most_common(1)[0][0]

if __name__ == '__main__':
    data = muat_peminjaman('peminjaman.csv') 

    aktif = filter_aktif(data)
    print(f'Peminjaman Aktif ({len(aktif)} data):') 
    print('-'*50)
    for p in aktif:
        print(f" {p.id_pinjam} {p.nama_peminjam:<20} {p.judul_buku}")
    print(f"\nBuku Terpopuler: {buku_terpopuler(data)}") 

    try:
        data[0].status = 'selesai'
    except AttributeError as e:
        print(f"\n[OK] NamedTuple immutable: {e}") 

print("_"*50, "frozen versi perpustakaan")
# perpustakaan.py
import csv
from dataclasses import dataclass
from typing import List, Dict
from collections import Counter

@dataclass(frozen=True)
class Peminjaman: 
    id_pinjam: str
    nama_peminjam: str
    judul_buku: str
    tanggal_pinjam: str
    status: str

def muat_peminjaman(filepath: str) -> List[Peminjaman]:
    data = []
    with open(filepath, newline='', encoding='utf-8-sig') as f:
        reader = csv.DictReader(f)
        reader.fieldnames = [h.strip() for h in reader.fieldnames]
        for row in reader:
            data.append(Peminjaman(
                id_pinjam=row['id_pinjam'].strip(),
                nama_peminjam=row['nama_peminjam'].strip(),
                judul_buku=row['judul_buku'].strip(),
                tanggal_pinjam=row['tanggal pinjam'].strip(), # 'tanggal pinjam' has a space
                status=row['status'].strip()
            ))
    return data

def filter_aktif(data: List[Peminjaman]) -> List[Peminjaman]:
    return [p for p in data if p.status == 'aktif']

def buku_terpopuler(data: List[Peminjaman]) -> str:
    judul_list = [p.judul_buku for p in data]
    # Using [0][0] to get the name of the most common book
    return Counter(judul_list).most_common(1)[0][0]

if __name__ == '__main__':
    data = muat_peminjaman('peminjaman.csv') # Provide the filepath

    aktif = filter_aktif(data)
    print(f'Peminjaman Aktif ({len(aktif)} data):') # Corrected f-string
    print('-'*50)
    for p in aktif:
        # Assuming the placeholder was for nama_peminjam
        print(f" {p.id_pinjam} {p.nama_peminjam:<20} {p.judul_buku}")
    print(f"\nBuku Terpopuler: {buku_terpopuler(data)}") # Pass data to the function

    try:
        data[0].status = 'selesai'
    except AttributeError as e:
        print(f"\n[OK] dataclass is frozen: {e}") #


#SOAL 2
import csv

header = ['id_karyawan', 'nama', 'departemen', 'gaji_pokok', 'tunjangan']

rows = [
    ['K001','Arif Budiman', 'Engineering', 8000000, 1500000],
    ['K002', 'Sari Indah', 'Marketing', 5500000, 1000000],
    ['K003', 'Budi Hartono', 'Engineering', 9500000, 2000000],
    ['K004', 'Maya Sari', 'HR', 4800000, 800000],
    ['K005', 'Rizky Pratama', 'Engineering', 7200000, 1200000],
    ['K006', 'Nila Permata', 'Marketing', 6000000, 1100000],
    ['K007', 'Dodi Setiawan', 'HR', 5000000, 900000],
    ['K008', 'Lena Wulandari', 'Engineering', 8800000, 1800000],
]

with open('karyawan.csv', 'w', newline='', encoding='utf-8') as f:
    writer = csv.writer(f)
    writer.writerow(header)
    writer.writerows(rows)

print("File 'karyawan.csv' berhasil dibuat!")
#karyawan.py
import csv
from dataclasses import dataclass
from typing import List, Dict

@dataclass(frozen=True)
class Karyawan:
    id_karyawan : str
    nama : str
    departemen : str
    gaji_pokok : int
    tunjangan : int

    def pajak(self) -> int:
        if self.gaji_pokok <= 8000000:
            return int(self.gaji_pokok * 0.05)
        return int(self.gaji_pokok * 0.10)

    def gaji_bersih(self) -> int:
        return (self.gaji_pokok + self.tunjangan) - self.pajak()

    def format_rupiah(self, nilai: int) -> str:
        return f"Rp {nilai:,.0f}".replace(",", ".")

def muat_karyawan (filepath: str) -> List[Karyawan]:
    data = []
    with open(filepath, newline='', encoding='utf-8-sig') as f:
        reader = csv.DictReader(f)
        reader.fieldnames = [h.strip() for h in reader.fieldnames]
        for row in reader:
            data.append(Karyawan(
                id_karyawan = row['id_karyawan'].strip(),
                nama = row['nama'].strip(),
                departemen = row['departemen'].strip(),
                gaji_pokok = int(row['gaji_pokok']),
                tunjangan = int(row['tunjangan'])
            ))
    return data

def total_pengeluaran_gaji(data: List[Karyawan]) -> int:
    return sum(k.gaji_bersih() for k in data)

def kelompok_per_departemen(data: List[Karyawan]) -> Dict[str, List[Karyawan]]:
    hasil = {}
    for k in data:
        hasil.setdefault(k.departemen, []).append(k)
    return hasil

if __name__ == '__main__':
    data = muat_karyawan('karyawan.csv')
    print(f"{'Nama':<20} {'Dept':<14} {'Gaji Pokok':>14} {'Tunjangan':>12} {'Pajak':>10} {'Bersih':>14}")
    print('='*90)
    for k in data:
        print(f"{k.nama:<20} {k.departemen:<14}"
              f"{k.format_rupiah(k.gaji_pokok):>14}"
              f"{k.format_rupiah(k.tunjangan):>12}"
              f"{k.format_rupiah(k.pajak()):>10}"
              f"{k.format_rupiah(k.gaji_bersih()):>14}")
    print(f"\nTotal Pengeluaran Gaji: {data[0].format_rupiah(total_pengeluaran_gaji(data))}")
    print('\nPengeluaran per Departemen:')
    for dept, karyawan in kelompok_per_departemen(data).items():
        total = sum(k.gaji_bersih() for k in karyawan)
        print(f" {dept:<15}: {data[0].format_rupiah(total)} ({len(karyawan)} karyawan)")

    try:
        data[0].gaji_pokok = 0
    except Exception as e:
        print(f"\n[OK] dataclass is frozen: {e}")

print("-"*50, "NamedTuple versi karyawan")
import csv

header = ['id_karyawan', 'nama', 'departemen', 'gaji_pokok', 'tunjangan']

rows = [
    ['K001','Arif Budiman', 'Engineering', 8000000, 1500000],
    ['K002', 'Sari Indah', 'Marketing', 5500000, 1000000],
    ['K003', 'Budi Hartono', 'Engineering', 9500000, 2000000],
    ['K004', 'Maya Sari', 'HR', 4800000, 800000],
    ['K005', 'Rizky Pratama', 'Engineering', 7200000, 1200000],
    ['K006', 'Nila Permata', 'Marketing', 6000000, 1100000],
    ['K007', 'Dodi Setiawan', 'HR', 5000000, 900000],
    ['K008', 'Lena Wulandari', 'Engineering', 8800000, 1800000],
]

with open('karyawan.csv', 'w', newline='', encoding='utf-8') as f:
    writer = csv.writer(f)
    writer.writerow(header)
    writer.writerows(rows)

print("File 'karyawan.csv' berhasil dibuat!")
#karyawan.py
from typing import NamedTuple, List
from collections import Counter

class karyawan(NamedTuple):
    id_karyawan : str
    nama : str
    departemen : str
    gaji_pokok : int
    tunjangan : int

    def pajak(self) -> int:
        if self.gaji_pokok <= 8000000:
            return int(self.gaji_pokok * 0.05)
        return int(self.gaji_pokok * 0.10)

    def gaji_bersih(self) -> int:
        return (self.gaji_pokok + self.tunjangan) - self.pajak()

    def format_rupiah(self, nilai: int) -> str:
        return f"Rp {nilai:,.0f}".replace(",", ".")

def muat_karyawan (filepath: str) -> List[Karyawan]:
    data = []
    with open(filepath, newline='', encoding='utf-8-sig') as f:
        reader = csv.DictReader(f)
        reader.fieldnames = [h.strip() for h in reader.fieldnames]
        for row in reader:
            data.append(karyawan(
                id_karyawan = row['id_karyawan'].strip(),
                nama = row['nama'].strip(),
                departemen = row['departemen'].strip(),
                gaji_pokok = int(row['gaji_pokok']),
                tunjangan = int(row['tunjangan'])
            ))
    return data

def total_pengeluaran_gaji(data: List[Karyawan]) -> int:
    return sum(k.gaji_bersih() for k in data)

def kelompok_per_departemen(data: List[Karyawan]) -> Dict[str, List[Karyawan]]:
    hasil = {}
    for k in data:
        hasil.setdefault(k.departemen, []).append(k)
    return hasil

if __name__ == '__main__':
    data = muat_karyawan('karyawan.csv')
    print(f"{'Nama':<20} {'Dept':<14} {'Gaji Pokok':>14} {'Tunjangan':>12} {'Pajak':>10} {'Bersih':>14}")
    print('='*90)
    for k in data:
        print(f"{k.nama:<20} {k.departemen:<14}"
              f"{k.format_rupiah(k.gaji_pokok):>14}"
              f"{k.format_rupiah(k.tunjangan):>12}"
              f"{k.format_rupiah(k.pajak()):>10}"
              f"{k.format_rupiah(k.gaji_bersih()):>14}")
    print(f"\nTotal Pengeluaran Gaji: {data[0].format_rupiah(total_pengeluaran_gaji(data))}")
    print('\nPengeluaran per Departemen:')
    for dept, karyawan in kelompok_per_departemen(data).items():
        total = sum(k.gaji_bersih() for k in karyawan)
        print(f" {dept:<15}: {data[0].format_rupiah(total)} ({len(karyawan)} karyawan)")

    try:
        data[0].gaji_pokok = 0
    except Exception as e:
        print(f"\n[OK] NamedTuple NamedTuple immutable: {e}")

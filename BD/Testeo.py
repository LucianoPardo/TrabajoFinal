import sqlite3

# =====================================
# Crear base de datos y tabla al inicio
# =====================================
def crear_tabla_si_no_existe():
    conexion = sqlite3.connect("productos.db")
    cursor = conexion.cursor()

    cursor.execute('''
    CREATE TABLE IF NOT EXISTS productos (
        id TEXT PRIMARY KEY,
        nombre TEXT NOT NULL
    )
    ''')

    conexion.commit()
    conexion.close()

# =====================================
# Alta de producto
# =====================================
def alta_producto():
    conexion = sqlite3.connect("productos.db")
    cursor = conexion.cursor()

    id_producto = input("ID del producto: ")

    cursor.execute("SELECT * FROM productos WHERE id = ?", (id_producto,))
    if cursor.fetchone():
        print("Error: ya existe un producto con ese ID.")
        conexion.close()
        input("Presione Enter para volver al menú...")
        return

    nombre = input("Nombre del producto: ")

    cursor.execute("INSERT INTO productos (id, nombre) VALUES (?, ?)", (id_producto, nombre))
    conexion.commit()
    conexion.close()

    print("Producto agregado correctamente.")
    input("Presione Enter para volver al menú...")

# =====================================
# Baja de producto
# =====================================
def baja_producto():
    conexion = sqlite3.connect("productos.db")
    cursor = conexion.cursor()

    print("¿Cómo quiere buscar el producto a eliminar?")
    print("1. Por ID")
    print("2. Por nombre")
    metodo = input("Opción: ")

    if metodo == "1":
        valor = input("Ingrese el ID: ")
        cursor.execute("SELECT * FROM productos WHERE id = ?", (valor,))
    elif metodo == "2":
        valor = input("Ingrese el nombre: ")
        cursor.execute("SELECT * FROM productos WHERE nombre = ?", (valor,))
    else:
        print("Opción no válida.")
        conexion.close()
        input("Presione Enter para volver al menú...")
        return

    producto = cursor.fetchone()
    if not producto:
        print("Producto no encontrado.")
        conexion.close()
        input("Presione Enter para volver al menú...")
        return

    print(f"Se encontró: ID: {producto[0]} | Nombre: {producto[1]}")
    confirmar = input("¿Está seguro de que desea eliminar este producto? (s/n): ")

    if confirmar.lower() == "s":
        cursor.execute("DELETE FROM productos WHERE id = ?", (producto[0],))
        conexion.commit()
        print("Producto eliminado.")
    else:
        print("Eliminación cancelada.")

    conexion.close()
    input("Presione Enter para volver al menú...")
# =====================================
# Modificación de producto
# =====================================
def modificar_producto():
    conexion = sqlite3.connect("productos.db")
    cursor = conexion.cursor()

    print("¿Cómo quiere buscar el producto a modificar?")
    print("1. Por ID")
    print("2. Por nombre")
    metodo = input("Opción: ")

    if metodo == "1":
        valor = input("Ingrese el ID: ")
        cursor.execute("SELECT * FROM productos WHERE id = ?", (valor,))
    elif metodo == "2":
        valor = input("Ingrese el nombre: ")
        cursor.execute("SELECT * FROM productos WHERE nombre = ?", (valor,))
    else:
        print("Opción no válida.")
        conexion.close()
        input("Presione Enter para volver al menú...")
        return

    producto = cursor.fetchone()
    if not producto:
        print("Producto no encontrado.")
        conexion.close()
        input("Presione Enter para volver al menú...")
        return

    print(f"Se encontró: ID: {producto[0]} | Nombre: {producto[1]}")
    confirmar = input("¿Está seguro de que desea modificar este producto? (s/n): ")

    if confirmar.lower() != "s":
        print("Modificación cancelada.")
        conexion.close()
        input("Presione Enter para volver al menú...")
        return

    nuevo_nombre = input(f"Ingrese nuevo nombre ({producto[1]}): ") or producto[1]
    cursor.execute("UPDATE productos SET nombre = ? WHERE id = ?", (nuevo_nombre, producto[0]))
    conexion.commit()

    print("Producto modificado.")
    conexion.close()
    input("Presione Enter para volver al menú...")
# =====================================
# Ver todos los productos
# =====================================
def ver_registros():
    conexion = sqlite3.connect("productos.db")
    cursor = conexion.cursor()

    cursor.execute("SELECT * FROM productos")
    productos = cursor.fetchall()

    if not productos:
        print("No hay productos registrados.")
    else:
        print("Lista de productos:")
        for i, prod in enumerate(productos, start=1):
            print(f"{i}. ID: {prod[0]} | Nombre: {prod[1]}")

    conexion.close()
    input("Presione Enter para volver al menú...")

# =====================================
# Menú principal
# =====================================
def menu():
    crear_tabla_si_no_existe()

    while True:
        print("\nMenú de Gestión de Productos")
        print("1. Alta de producto")
        print("2. Baja de producto")
        print("3. Modificación de producto")
        print("4. Ver todos los productos")
        print("5. Salir")

        opcion = input("Seleccione una opción (1-5): ")

        if opcion == "1":
            alta_producto()
        elif opcion == "2":
            baja_producto()
        elif opcion == "3":
            modificar_producto()
        elif opcion == "4":
            ver_registros()
        elif opcion == "5":
            print("Saliendo del programa...")
            break
        else:
            print("Opción no válida. Intente nuevamente.")
            input("Presione Enter para continuar...")

# =====================================
# Iniciar programa
# =====================================
menu()

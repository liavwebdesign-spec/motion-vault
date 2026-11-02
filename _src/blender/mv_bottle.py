# בקבוק בושם בדיוני (LUMA) לשני מהלכים במאגר, בהשראת Scrolltide (1.11.2026):
#   turn: רשת זוויות (סיבוב אופקי x הטיה) על רקע שקוף, למוצר שמסתובב אחרי העכבר
#   land: הבקבוק נוחת על בסיס, סרטון אחד, והפריים האחרון שוב כמסכה לחיתוך מדויק
# הרצה: blender -b --factory-startup -P mv_bottle.py -- <turn|land> <outdir> [res_x] [samples]
import bpy, sys, math, os

argv = sys.argv[sys.argv.index("--") + 1:]
MODE, OUT = argv[0], argv[1]
RES = int(argv[2]) if len(argv) > 2 else 720
SAMPLES = int(argv[3]) if len(argv) > 3 else 48
os.makedirs(OUT, exist_ok=True)

bpy.ops.wm.read_factory_settings(use_empty=True)
sc = bpy.context.scene
sc.render.engine = 'CYCLES'
prefs = bpy.context.preferences.addons['cycles'].preferences
try:
    prefs.compute_device_type = 'OPTIX'
    prefs.refresh_devices()
    for d in prefs.devices:
        d.use = d.type == 'OPTIX'
    sc.cycles.device = 'GPU'
except Exception:
    sc.cycles.device = 'CPU'
sc.cycles.samples = SAMPLES
sc.cycles.use_denoising = True
try:
    sc.cycles.denoiser = 'OPTIX'
except Exception:
    pass
sc.view_settings.view_transform = 'AgX'
sc.view_settings.look = 'AgX - Medium High Contrast'
sc.render.image_settings.file_format = 'PNG'
sc.render.image_settings.color_mode = 'RGBA'


def mat(name, **k):
    m = bpy.data.materials.new(name)
    m.use_nodes = True
    b = m.node_tree.nodes["Principled BSDF"]
    for key, v in k.items():
        b.inputs[key].default_value = v
    return m


GLASS = mat("glass", **{"Base Color": (0.93, 0.95, 0.94, 1), "Roughness": 0.04, "IOR": 1.47, "Transmission Weight": 1.0})
LIQ = mat("liquid", **{"Base Color": (0.95, 0.55, 0.22, 1), "Roughness": 0.0, "IOR": 1.36, "Transmission Weight": 1.0})
GOLD = mat("gold", **{"Base Color": (0.86, 0.66, 0.36, 1), "Metallic": 1.0, "Roughness": 0.22})
INK = mat("ink", **{"Base Color": (0.06, 0.05, 0.05, 1), "Roughness": 0.5})
PAPER = mat("paper", **{"Base Color": (0.93, 0.9, 0.84, 1), "Roughness": 0.7})
STONE = mat("stone", **{"Base Color": (0.78, 0.72, 0.64, 1), "Roughness": 0.85})
BACK = mat("backdrop", **{"Base Color": (0.86, 0.8, 0.72, 1), "Roughness": 1.0})


def bevel(o, w, seg=8):
    m = o.modifiers.new("bv", 'BEVEL')
    m.width, m.segments, m.limit_method = w, seg, 'NONE'
    o.modifiers.new("ws", 'WEIGHTED_NORMAL')
    bpy.ops.object.shade_smooth()


root = bpy.data.objects.new("bottle", None)
sc.collection.objects.link(root)

def part(o, m, parent=root):
    o.data.materials.append(m)
    o.parent = parent
    return o

# הגוף: קופסה עבה עם פינות מעוגלות
bpy.ops.mesh.primitive_cube_add(size=1, location=(0, 0, 0.65))
body = bpy.context.object; body.scale = (0.78, 0.42, 1.3)
bpy.ops.object.transform_apply(scale=True); bevel(body, 0.14); part(body, GLASS)
# הנוזל בפנים, נמוך מהכתפיים
bpy.ops.mesh.primitive_cube_add(size=1, location=(0, 0, 0.55))
liq = bpy.context.object; liq.scale = (0.66, 0.31, 0.98)
bpy.ops.object.transform_apply(scale=True); bevel(liq, 0.1); part(liq, LIQ)
# צוואר ופקק
bpy.ops.mesh.primitive_cylinder_add(radius=0.13, depth=0.16, location=(0, 0, 1.36), vertices=48)
neck = bpy.context.object; bevel(neck, 0.02, 3); part(neck, GOLD)
bpy.ops.mesh.primitive_cylinder_add(radius=0.24, depth=0.46, location=(0, 0, 1.66), vertices=64)
cap = bpy.context.object; bevel(cap, 0.05, 6); part(cap, GOLD)
# תווית נייר על החזית ושם המותג עליה
bpy.ops.mesh.primitive_cube_add(size=1, location=(0, -0.215, 0.62))
lab = bpy.context.object; lab.scale = (0.42, 0.006, 0.5)
bpy.ops.object.transform_apply(scale=True); bevel(lab, 0.004, 2); part(lab, PAPER)
bpy.ops.object.text_add(location=(0, -0.222, 0.66), rotation=(math.radians(90), 0, 0))
txt = bpy.context.object; txt.data.body = "LUMA"; txt.data.align_x = 'CENTER'; txt.data.align_y = 'CENTER'
txt.data.size = 0.13; txt.data.extrude = 0.002; txt.data.space_character = 1.25; part(txt, INK)
bpy.ops.object.text_add(location=(0, -0.222, 0.5), rotation=(math.radians(90), 0, 0))
t2 = bpy.context.object; t2.data.body = "EAU DE PARFUM"; t2.data.align_x = 'CENTER'; t2.data.align_y = 'CENTER'
t2.data.size = 0.034; t2.data.extrude = 0.001; t2.data.space_character = 1.4; part(t2, INK)

# תאורת סטודיו קבועה: המוצר זז מתחתיה, ולכן ההשתקפויות זזות עליו כמו במציאות
def area(name, loc, rot, size, power, color=(1, 1, 1)):
    d = bpy.data.lights.new(name, 'AREA'); d.size = size; d.energy = power; d.color = color
    o = bpy.data.objects.new(name, d); o.location = loc; o.rotation_euler = [math.radians(a) for a in rot]
    sc.collection.objects.link(o)
area("key", (-2.6, -2.4, 3.0), (52, 0, -45), 2.2, 420, (1, 0.96, 0.9))
area("rim", (2.4, 1.8, 2.4), (-60, 0, 130), 1.4, 380, (0.9, 0.95, 1))
area("fill", (2.8, -2.2, 0.8), (80, 0, 50), 3.0, 120)
area("top", (0, 0, 4.2), (0, 0, 0), 1.6, 160)

w = bpy.data.worlds.new("w"); sc.world = w; w.use_nodes = True
w.node_tree.nodes["Background"].inputs[0].default_value = (0.82, 0.8, 0.78, 1)
w.node_tree.nodes["Background"].inputs[1].default_value = 0.35

cam_d = bpy.data.cameras.new("cam"); cam_d.lens = 70
cam = bpy.data.objects.new("cam", cam_d); sc.collection.objects.link(cam); sc.camera = cam


def aim(o, target):
    from mathutils import Vector
    d = Vector(target) - o.location
    o.rotation_euler = d.to_track_quat('-Z', 'Y').to_euler()


if MODE == "turn":
    sc.render.film_transparent = True
    sc.cycles.film_transparent_glass = True
    sc.render.resolution_x, sc.render.resolution_y = RES, int(RES * 1.25)
    cam.location = (0, -5.0, 1.05); aim(cam, (0, 0, 0.95))
    YAW = list(range(-36, 37, 6))      # 13 עמודות
    PITCH = list(range(-12, 13, 6))    # 5 שורות
    for pi, p in enumerate(PITCH):
        for yi, y in enumerate(YAW):
            root.rotation_euler = (math.radians(-p), 0, math.radians(y))
            sc.render.filepath = os.path.join(OUT, f"t-{pi}-{yi:02d}.png")
            bpy.ops.render.render(write_still=True)
    print("TURN DONE", len(PITCH) * len(YAW))

elif MODE == "land":
    # במה: רקע מעוגל ובסיס אבן עגול
    bpy.ops.mesh.primitive_plane_add(size=40, location=(0, 6, 0))
    bd = bpy.context.object; bd.data.materials.append(BACK)
    bpy.ops.mesh.primitive_plane_add(size=40, location=(0, 0, -0.32)); fl = bpy.context.object; fl.data.materials.append(BACK)
    bd.rotation_euler = (math.radians(90), 0, 0)
    bpy.ops.mesh.primitive_cylinder_add(radius=1.25, depth=0.32, location=(0, 0, -0.16), vertices=96)
    pl = bpy.context.object; bevel(pl, 0.03, 4); pl.data.materials.append(STONE)
    sc.render.film_transparent = False
    sc.render.resolution_x, sc.render.resolution_y = RES, int(RES * 9 / 16)
    cam.location = (0, -9.5, 2.1); aim(cam, (0, 0, 0.9)); cam_d.lens = 58
    sc.frame_start, sc.frame_end = 1, 60
    # נפילה עם סיבוב, נגיעה בפריים 30, קפיצה קטנה, והתייצבות עד 44
    keys = [(1, 5.6, -50, 18), (26, 0.35, -8, 4), (30, 0.0, 0, 0), (35, 0.12, 2, -1.2), (39, 0.0, 0, 0), (42, 0.025, 0, 0.3), (44, 0.0, 0, 0), (60, 0.0, 0, 0)]
    for f, z, rz, rx in keys:
        root.location = (0, 0, z); root.rotation_euler = (math.radians(rx), 0, math.radians(rz))
        root.keyframe_insert("location", frame=f); root.keyframe_insert("rotation_euler", frame=f)
    sc.render.filepath = os.path.join(OUT, "f-")
    bpy.ops.render.render(animation=True)
    # מסכה של הפריים האחרון: הבקבוק לבן, כל השאר שחור, בלי תאורה
    WHITE = bpy.data.materials.new("white"); WHITE.use_nodes = True
    nt = WHITE.node_tree; nt.nodes.clear()
    em = nt.nodes.new("ShaderNodeEmission"); em.inputs[0].default_value = (1, 1, 1, 1)
    out = nt.nodes.new("ShaderNodeOutputMaterial"); nt.links.new(em.outputs[0], out.inputs[0])
    BLACK = bpy.data.materials.new("black"); BLACK.use_nodes = True
    nb = BLACK.node_tree; nb.nodes.clear()
    eb = nb.nodes.new("ShaderNodeEmission"); eb.inputs[0].default_value = (0, 0, 0, 1)
    ob = nb.nodes.new("ShaderNodeOutputMaterial"); nb.links.new(eb.outputs[0], ob.inputs[0])
    for o in sc.objects:
        if o.type in ('MESH', 'FONT'):
            m = WHITE if o.parent == root else BLACK
            o.data.materials.clear(); o.data.materials.append(m)
    w.node_tree.nodes["Background"].inputs[1].default_value = 0
    sc.view_settings.view_transform = 'Standard'; sc.view_settings.look = 'None'
    sc.cycles.samples = 16; sc.cycles.use_denoising = False
    sc.frame_set(60)
    sc.render.filepath = os.path.join(OUT, "mask.png")
    bpy.ops.render.render(write_still=True)
    print("LAND DONE")

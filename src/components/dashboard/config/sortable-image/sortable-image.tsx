import * as React from 'react'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input/input'
import { Label } from '@/components/ui/label/label'
import { Switch } from '@/components/ui/switch/switch'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog/dialog'
import { DndContext, closestCenter, DragEndEvent } from '@dnd-kit/core'
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import Image from 'next/image'

interface Banner {
  id: string
  image: string
  title: string
  url: string
  status: boolean
  targetDevice: 'web' | 'mobile'
}

interface SortableBannerProps {
  banner: Banner
  onEdit: (banner: Banner) => void
  onDelete: (id: string) => void
  onToggleStatus: (id: string) => void
}

function SortableBanner({
  banner,
  onEdit,
  onDelete,
  onToggleStatus,
}: SortableBannerProps) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: banner.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
      {...attributes}
      {...listeners}
    >
      <Image
        src={banner.image}
        alt={banner.title}
        width={500}
        height={200}
        className="w-full h-40 object-cover"
      />
      <div className="p-4">
        <h3 className="font-semibold text-lg truncate">
          {banner.title || 'Sem título'}
        </h3>
        <p className="text-sm text-gray-500 truncate">
          <a
            href={banner.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline"
          >
            {banner.url || 'Sem URL'}
          </a>
        </p>
        <div className="flex justify-between items-center mt-2">
          <Switch
            checked={banner.status}
            onCheckedChange={() => onToggleStatus(banner.id)}
          />
          <div className="space-x-2">
            <Button size="sm" onClick={() => onEdit(banner)}>
              Editar
            </Button>
            <Button
              variant="destructive"
              size="sm"
              onClick={() => onDelete(banner.id)}
            >
              Deletar
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export function SliderTab() {
  const [banners, setBanners] = React.useState<Banner[]>([
    {
      id: '1',
      image: '/images/banner1.jpg',
      title: 'Promoção de Verão (Web)',
      url: 'https://example.com/verao',
      status: true,
      targetDevice: 'web',
    },
    {
      id: '2',
      image: '/images/banner2.jpg',
      title: 'Promoção de Inverno (Mobile)',
      url: 'https://example.com/inverno',
      status: true,
      targetDevice: 'mobile',
    },
  ])
  const [isDialogOpen, setIsDialogOpen] = React.useState(false)
  const [editingBanner, setEditingBanner] = React.useState<Banner | null>(null)
  const [tempBanner, setTempBanner] = React.useState<Banner>({
    id: '',
    image: '',
    title: '',
    url: '',
    status: true,
    targetDevice: 'web',
  })
  const [previewImage, setPreviewImage] = React.useState<string | null>(null)
  const [selectedDevice, setSelectedDevice] = React.useState<'web' | 'mobile'>(
    'web'
  )

  const canAddMoreBanners = banners.length < 10

  const filteredBanners = banners.filter(
    (banner) => banner.targetDevice === selectedDevice
  )

  function handleConfirmBanner() {
    if (!tempBanner.image) {
      alert('Por favor, faça upload de uma imagem antes de confirmar.')
      return
    }

    if (editingBanner) {
      setBanners((prev) =>
        prev.map((banner) =>
          banner.id === editingBanner.id ? { ...tempBanner } : banner
        )
      )
    } else {
      setBanners((prev) => [
        ...prev,
        { ...tempBanner, id: `banner-${Date.now()}` },
      ])
    }
    closeDialog()
  }

  function closeDialog() {
    setIsDialogOpen(false)
    setEditingBanner(null)
    setTempBanner({
      id: '',
      image: '',
      title: '',
      url: '',
      status: true,
      targetDevice: 'web',
    })
    setPreviewImage(null)
  }

  function handleDeleteBanner(id: string) {
    setBanners((prev) => prev.filter((banner) => banner.id !== id))
  }

  function handleImageUpload(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0]
    if (file) {
      const imageUrl = URL.createObjectURL(file)
      setTempBanner((prev) => ({
        ...prev,
        image: imageUrl,
      }))
      setPreviewImage(imageUrl)
    }
  }

  function handleEditBanner(banner: Banner) {
    setEditingBanner(banner)
    setTempBanner(banner)
    setPreviewImage(banner.image)
    setIsDialogOpen(true)
  }

  function handleToggleStatus(id: string) {
    setBanners((prev) =>
      prev.map((banner) =>
        banner.id === id ? { ...banner, status: !banner.status } : banner
      )
    )
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event
    if (over && active.id !== over.id) {
      setBanners((prev) => {
        const oldIndex = prev.findIndex((banner) => banner.id === active.id)
        const newIndex = prev.findIndex((banner) => banner.id === over.id)
        return arrayMove(prev, oldIndex, newIndex)
      })
    }
  }

  return (
    <div className="p-4">
      <Card>
        <CardHeader className="flex justify-between items-center">
          <CardTitle>Lista de Banners</CardTitle>
          <Button
            onClick={() => {
              setEditingBanner(null)
              setTempBanner({
                id: '',
                image: '',
                title: '',
                url: '',
                status: true,
                targetDevice: 'web',
              })
              setPreviewImage(null)
              setIsDialogOpen(true)
            }}
            disabled={!canAddMoreBanners}
          >
            + Novo Banner
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-end space-x-4">
            <label>
              <input
                type="radio"
                name="device"
                value="web"
                checked={selectedDevice === 'web'}
                onChange={() => setSelectedDevice('web')}
              />
              Web
            </label>
            <label>
              <input
                type="radio"
                name="device"
                value="mobile"
                checked={selectedDevice === 'mobile'}
                onChange={() => setSelectedDevice('mobile')}
              />
              Mobile
            </label>
          </div>
          {filteredBanners.length === 0 ? (
            <p className="text-gray-500 text-center">
              Nenhum banner adicionado.
            </p>
          ) : (
            <DndContext
              collisionDetection={closestCenter}
              onDragEnd={handleDragEnd}
            >
              <SortableContext
                items={filteredBanners.map((banner) => banner.id)}
                strategy={verticalListSortingStrategy}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredBanners.map((banner) => (
                    <SortableBanner
                      key={banner.id}
                      banner={banner}
                      onEdit={handleEditBanner}
                      onDelete={handleDeleteBanner}
                      onToggleStatus={handleToggleStatus}
                    />
                  ))}
                </div>
              </SortableContext>
            </DndContext>
          )}
        </CardContent>
      </Card>

      {isDialogOpen && (
        <Dialog open={isDialogOpen} onOpenChange={closeDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {editingBanner ? 'Editar Banner' : 'Adicionar Banner'}
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="image">Imagem</Label>
                {previewImage && (
                  <Image
                    src={previewImage}
                    alt="Preview"
                    width={500}
                    height={200}
                    className="w-full h-40 object-cover rounded-lg mb-2"
                  />
                )}
                <Input
                  id="image"
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                />
              </div>
              <div>
                <Label htmlFor="title">Título</Label>
                <Input
                  id="title"
                  type="text"
                  placeholder="Título do banner"
                  value={tempBanner.title}
                  onChange={(e) =>
                    setTempBanner((prev) => ({
                      ...prev,
                      title: e.target.value,
                    }))
                  }
                />
              </div>
              <div>
                <Label htmlFor="url">URL</Label>
                <Input
                  id="url"
                  type="text"
                  placeholder="URL do banner"
                  value={tempBanner.url}
                  onChange={(e) =>
                    setTempBanner((prev) => ({
                      ...prev,
                      url: e.target.value,
                    }))
                  }
                />
              </div>
              <div>
                <Label htmlFor="targetDevice">Dispositivo</Label>
                <select
                  id="targetDevice"
                  value={tempBanner.targetDevice}
                  onChange={(e) =>
                    setTempBanner((prev) => ({
                      ...prev,
                      targetDevice: e.target.value as 'web' | 'mobile',
                    }))
                  }
                  className="w-full border rounded-md p-2"
                >
                  <option value="web">Web</option>
                  <option value="mobile">Mobile</option>
                </select>
              </div>
              <div className="flex justify-end space-x-2">
                <Button variant="secondary" onClick={closeDialog}>
                  Cancelar
                </Button>
                <Button
                  onClick={handleConfirmBanner}
                  disabled={!tempBanner.image}
                >
                  Confirmar
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}

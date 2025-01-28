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
    >
      {/* 
        Tornamos a imagem o "handle" de arraste:
        Adicionamos cursor de mover, e passamos {...attributes} {...listeners} apenas aqui.
      */}
      <div className="cursor-move" {...attributes} {...listeners}>
        <Image
          src={banner.image}
          alt={banner.title}
          width={500}
          height={200}
          className="w-full h-40 object-cover"
        />
      </div>
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
      image: '/images/banners/desktop-foqueemseunegocio.jpg',
      title: 'Foque em seu negócio',
      url: '#',
      status: true,
      targetDevice: 'web',
    },
    {
      id: '2',
      image: '/images/banners/mobile-foqueemseunegocio.jpg',
      title: 'Foque em seu negócio',
      url: '#',
      status: true,
      targetDevice: 'mobile',
    },
  ])

  // States relacionados ao formulário e edição:
  const [isDialogOpen, setIsDialogOpen] = React.useState(false)
  const [editingBanner, setEditingBanner] = React.useState<Banner | null>(null)

  // States relacionados a deleção:
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = React.useState(false)
  const [bannerToDelete, setBannerToDelete] = React.useState<string | null>(
    null
  )

  // State temporário para armazenar dados do banner antes de salvar
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

  // --- Ações de abrir e fechar os modais ---
  function openBannerDialogForCreate() {
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
  }

  function closeDialog() {
    setIsDialogOpen(false)
    setEditingBanner(null)
    // Reseta o banner temporário:
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

  // --- Ações de criar e editar banners ---
  function handleConfirmBanner() {
    if (!tempBanner.image) {
      alert('Por favor, faça upload de uma imagem antes de confirmar.')
      return
    }

    if (editingBanner) {
      // Edição de um banner existente
      setBanners((prev) =>
        prev.map((banner) =>
          banner.id === editingBanner.id ? { ...tempBanner } : banner
        )
      )
    } else {
      // Criação de um novo banner
      setBanners((prev) => [
        ...prev,
        { ...tempBanner, id: `banner-${Date.now()}` },
      ])
    }
    closeDialog()
  }

  function handleEditBanner(banner: Banner) {
    setEditingBanner(banner)
    setTempBanner(banner)
    setPreviewImage(banner.image)
    setIsDialogOpen(true)
  }

  // --- Ações de upload de imagem ---
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

  // --- Ações de deleção ---
  function handleDeleteBanner(id: string) {
    setBannerToDelete(id)
    setIsDeleteDialogOpen(true)
  }

  function confirmDeleteBanner() {
    if (!bannerToDelete) return
    setBanners((prev) => prev.filter((banner) => banner.id !== bannerToDelete))
    setIsDeleteDialogOpen(false)
    setBannerToDelete(null)
  }

  // --- Ativação/Desativação do banner ---
  function handleToggleStatus(id: string) {
    setBanners((prev) =>
      prev.map((banner) =>
        banner.id === id ? { ...banner, status: !banner.status } : banner
      )
    )
  }

  // --- Drag and Drop ---
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
            onClick={openBannerDialogForCreate}
            disabled={!canAddMoreBanners}
          >
            + Novo Banner
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Seletor de dispositivo */}
          <div className="flex justify-end space-x-4">
            <label className="flex items-center space-x-1">
              <input
                type="radio"
                name="device"
                value="web"
                checked={selectedDevice === 'web'}
                onChange={() => setSelectedDevice('web')}
              />
              <span>Web</span>
            </label>
            <label className="flex items-center space-x-1">
              <input
                type="radio"
                name="device"
                value="mobile"
                checked={selectedDevice === 'mobile'}
                onChange={() => setSelectedDevice('mobile')}
              />
              <span>Mobile</span>
            </label>
          </div>

          {/* Lista de banners filtrados */}
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

      {/* Modal de criação/edição */}
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

      {/* Modal de confirmação de deleção */}
      {isDeleteDialogOpen && (
        <Dialog
          open={isDeleteDialogOpen}
          onOpenChange={() => setIsDeleteDialogOpen(false)}
        >
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Deletar Banner</DialogTitle>
            </DialogHeader>
            <p>Tem certeza de que deseja deletar este banner?</p>
            <div className="flex justify-end space-x-2 mt-4">
              <Button
                variant="secondary"
                onClick={() => setIsDeleteDialogOpen(false)}
              >
                Cancelar
              </Button>
              <Button variant="destructive" onClick={confirmDeleteBanner}>
                Deletar
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}

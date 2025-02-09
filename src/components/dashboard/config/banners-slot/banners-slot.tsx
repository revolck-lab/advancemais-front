// src/components/dashboard/config/banners-slot/banners-slot.tsx
import React, { useState } from 'react'
import { DndContext, closestCenter, DragEndEvent } from '@dnd-kit/core'
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import Image from 'next/image'
import { Card, CardContent, CardHeader } from '@/components/ui/card/card'
import { Button } from '@/components/ui/button1'
import { Input } from '@/components/ui/input/input'
import { Label } from '@/components/ui/label/label'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog/dialog'
import { FileUpload } from '@/components/ui/file-upload/file-upload'

interface Banner {
  id: string
  url: string
  title: string
  image: string
}

interface SortableBannerProps {
  banner: Banner
  onEdit: (banner: Banner) => void
  onDelete: (id: string) => void
}

function SortableBanner({ banner, onEdit, onDelete }: SortableBannerProps) {
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
      className="w-full max-w-[300px] mx-auto rounded-lg bg-white border-1 border-neutral-100 overflow-hidden"
    >
      <div
        className="cursor-move"
        {...attributes}
        {...listeners}
        title="Arraste para reordenar"
      >
        <Image
          src={banner.image}
          alt={banner.title}
          width={300}
          height={180}
          className="w-full object-cover"
        />
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-sm truncate">{banner.title}</h3>
        <p className="text-sm truncate">
          {banner.url ? (
            <a
              href={banner.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-secondary hover:text-secondary-800 text-sm hover:underline"
            >
              Clique aqui para visualizar a URL
            </a>
          ) : (
            'Sem URL'
          )}
        </p>
        <div className="flex justify-between mt-3">
          <Button
            className="py-2 px-4 shadow-none bg-neutral-50 text-neutral hover:text-white hover:bg-neutral-400"
            onClick={(e) => {
              e.stopPropagation()
              onEdit(banner)
            }}
          >
            Editar
          </Button>
          <Button
            className="py-2 px-4 transition-all bg-secondary-200 text-white hover:bg-secondary"
            onClick={(e) => {
              e.stopPropagation()
              onDelete(banner.id)
            }}
          >
            Deletar
          </Button>
        </div>
      </div>
    </div>
  )
}

export default function BannersSlot() {
  const [banners, setBanners] = useState<Banner[]>([
    {
      id: '1',
      url: '#',
      title: 'Acelere o crescimento do seu negócio',
      image: '/images/home/banner_crescimento.webp',
    },
    {
      id: '2',
      url: '#',
      title: 'Reduza custos de operação',
      image: '/images/home/banner_custos.webp',
    },
    {
      id: '3',
      url: '#',
      title: 'Construa uma equipe sólida',
      image: '/images/home/banner_equipe.webp',
    },
    {
      id: '4',
      url: '#',
      title: 'Aumente a produtividade',
      image: '/images/home/banner_produtividade.webp',
    },
    {
      id: '5',
      url: '#',
      title: 'Alcance novos resultados',
      image: '/images/home/banner_resultados.webp',
    },
  ])
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [bannerToDelete, setBannerToDelete] = useState<string | null>(null)
  const [editingBanner, setEditingBanner] = useState<Banner | null>(null)
  const [tempBanner, setTempBanner] = useState<Banner>({
    id: '',
    url: '',
    title: '',
    image: '',
  })
  const [previewImage, setPreviewImage] = useState<string | null>(null)

  const handleConfirmBanner = () => {
    if (!tempBanner.image || !tempBanner.title || !tempBanner.url) {
      alert('Todos os campos são obrigatórios.')
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

  const closeDialog = () => {
    setIsDialogOpen(false)
    setEditingBanner(null)
    setTempBanner({ id: '', url: '', title: '', image: '' })
    setPreviewImage(null)
  }

  const handleDeleteBanner = (id: string) => {
    setBannerToDelete(id)
    setIsDeleteDialogOpen(true)
  }

  const confirmDeleteBanner = () => {
    if (banners.length <= 1) {
      alert('É necessário manter pelo menos um banner.')
      return
    }
    setBanners((prev) => prev.filter((banner) => banner.id !== bannerToDelete))
    setBannerToDelete(null)
    setIsDeleteDialogOpen(false)
  }

  const handleEditBanner = (banner: Banner) => {
    setEditingBanner(banner)
    setTempBanner(banner)
    setPreviewImage(banner.image)
    setIsDialogOpen(true)
  }

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event
    if (over && active.id !== over.id) {
      setBanners((prev) => {
        const oldIndex = prev.findIndex((banner) => banner.id === active.id)
        const newIndex = prev.findIndex((banner) => banner.id === over.id)
        return arrayMove(prev, oldIndex, newIndex)
      })
    }
  }

  const canAddMoreBanners = banners.length < 5

  return (
    <div className="p-0">
      <Card className="border-0 shadow-none">
        <CardHeader className="flex justify-end">
          <div className="flex justify-end w-full">
            <Button
              onClick={() => {
                setEditingBanner(null)
                setTempBanner({ id: '', url: '', title: '', image: '' })
                setPreviewImage(null)
                setIsDialogOpen(true)
              }}
              disabled={!canAddMoreBanners}
              className="bg-primary px-5 py-5 text-white hover:text-white hover:bg-primary-800"
            >
              Novo Banner
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <DndContext
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={banners.map((banner) => banner.id)}
              strategy={verticalListSortingStrategy}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-5">
                {banners.map((banner) => (
                  <SortableBanner
                    key={banner.id}
                    banner={banner}
                    onEdit={handleEditBanner}
                    onDelete={handleDeleteBanner}
                  />
                ))}
              </div>
            </SortableContext>
          </DndContext>
        </CardContent>
      </Card>

      {/* Modal para adicionar/editar banner */}
      {isDialogOpen && (
        <Dialog open={isDialogOpen} onOpenChange={closeDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {editingBanner ? 'Editando Banner' : 'Adicionando Banner'}
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="image" className="required">
                  Imagem
                </Label>
                {previewImage && (
                  <Image
                    src={previewImage}
                    alt="Preview"
                    width={500}
                    height={300}
                    className="w-full h-40 object-cover rounded-lg mb-2"
                  />
                )}
                <FileUpload
                  multiple={false}
                  maxFiles={1}
                  maxSize={5 * 1024 * 1024} // 5MB
                  allowedFormats={['image/jpeg', 'image/png', 'image/webp']}
                  onUpload={(files) => {
                    const file = files[0]
                    if (file) {
                      const imageUrl = URL.createObjectURL(file)
                      setTempBanner((prev) => ({
                        ...prev,
                        image: imageUrl,
                      }))
                      setPreviewImage(imageUrl)
                    }
                  }}
                  onRemove={() => {
                    setTempBanner((prev) => ({ ...prev, image: '' }))
                    setPreviewImage(null)
                  }}
                  defaultFiles={
                    editingBanner?.image
                      ? [
                          {
                            ...new File([], 'Imagem Atual'),
                            path: editingBanner.image,
                            name: 'Imagem Atual',
                            size: 1024,
                            type: 'image/jpeg',
                          },
                        ]
                      : []
                  }
                />
              </div>
              <div>
                <Label htmlFor="title" className="required">
                  Título
                </Label>
                <Input
                  id="title"
                  type="text"
                  placeholder="Digite o título"
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
                <Label htmlFor="url" className="required">
                  URL
                </Label>
                <Input
                  id="url"
                  type="text"
                  placeholder="Digite o URL"
                  value={tempBanner.url}
                  onChange={(e) =>
                    setTempBanner((prev) => ({
                      ...prev,
                      url: e.target.value,
                    }))
                  }
                />
              </div>
              <div className="flex justify-end space-x-2">
                <Button
                  className="py-2 px-4 bg-neutral-50 text-neutral hover:text-white hover:bg-neutral-400"
                  onClick={closeDialog}
                >
                  Cancelar
                </Button>
                <Button
                  className={`py-2 px-4 transition-all ${
                    !tempBanner.image || !tempBanner.title || !tempBanner.url
                      ? 'bg-primary-200 text-white cursor-not-allowed'
                      : 'bg-primary text-white hover:bg-primary-800'
                  }`}
                  disabled={
                    !tempBanner.image || !tempBanner.title || !tempBanner.url
                  }
                  onClick={handleConfirmBanner}
                >
                  Salvar
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
                className="py-2 px-4 bg-neutral-50 text-neutral hover:text-white hover:bg-neutral-400"
                onClick={() => setIsDeleteDialogOpen(false)}
              >
                Cancelar
              </Button>
              <Button
                className="py-2 px-4 transition-all bg-secondary text-white hover:bg-secondary-800"
                onClick={confirmDeleteBanner}
              >
                Deletar
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}

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
import { Button } from '@/components/ui/button/button'
import { Input } from '@/components/ui/input/input'
import { Label } from '@/components/ui/label/label'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog/dialog'
import { FileUpload } from '@/components/ui/file-upload/file-upload'
import { toast } from '@/hooks/use-toast'
import { TextareaDashboard } from '@/components/ui/textarea/textarea-dashboard'

interface Banner {
  id: string
  url: string
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
      className="w-full max-w-[400px] mx-auto rounded-lg bg-white border-1 border-neutral-100 overflow-hidden"
    >
      <div
        className="cursor-move"
        {...attributes}
        {...listeners}
        title="Arraste para reordenar"
      >
        <Image
          src={banner.image}
          alt="Conexão Forte - Resutlado forte [ADVANCE+]"
          width={300}
          height={180}
          className="w-full object-cover"
        />
      </div>
      <div className="p-4">
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

export default function StrongConnectionSection() {
  // Adicione os estados para título e descrição aqui:
  const [title, setTitle] = useState<string>('Conexão Forte = Resultado Forte')
  const [description, setDescription] = useState<string>(
    `De acordo com uma pesquisa recente (Front) realizada com mais de 1.100 profissionais, um dos principais padrões das equipes de alta performance é a comunicação aberta e de confiança.

Estes times valorizam o tempo de cada um e possuem fortes habilidades de comunicação.

Entendemos que o seu desafio é único e focamos na personalização de acordo com as necessidades de comunicação da sua equipe. Conheça nossas soluções que já ajudaram centenas de empresas a se comunicarem de forma estratégica e eficaz.`
  )

  const [banners, setBanners] = useState<Banner[]>([
    {
      id: '1',
      url: '#',
      image: '/images/home/banner_site_2.webp',
    },
    {
      id: '2',
      url: '#',
      image: '/images/home/banner_site_3.webp',
    },
    {
      id: '3',
      url: '#',
      image: '/images/home/banner_info.webp',
    },
    {
      id: '4',
      url: '#',
      image: '/images/sobre/banner_about.webp',
    },
  ])
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [bannerToDelete, setBannerToDelete] = useState<string | null>(null)
  const [editingBanner, setEditingBanner] = useState<Banner | null>(null)
  const [tempBanner, setTempBanner] = useState<Banner>({
    id: '',
    url: '',
    image: '',
  })
  const [previewImage, setPreviewImage] = useState<string | null>(null)

  const handleConfirmBanner = () => {
    if (!tempBanner.image || !tempBanner.url) {
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
    setTempBanner({ id: '', url: '', image: '' })
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

  const canAddMoreBanners = banners.length < 4

  const handleSave = () => {
    // Verificar se há banners inválidos
    const invalidBanners = banners.filter(
      (banner) => !banner.image || !banner.url
    )

    if (invalidBanners.length > 0) {
      toast({
        title: 'Erro ao salvar!',
        description: 'Alguns banners possuem campos incompletos.',
        variant: 'danger',
      })
      return
    }

    try {
      // Simular envio para API/externo
      console.log('Dados salvos:', banners)

      toast({
        title: 'Salvo com sucesso!',
        description: 'A configuração dos banners foi atualizada.',
        variant: 'success',
      })
    } catch {
      toast({
        title: 'Erro ao salvar!',
        description: 'Ocorreu um erro ao tentar salvar as configurações.',
        variant: 'danger',
      })
    }
  }

  return (
    <div className="p-0">
      <Card className="border-0 shadow-none">
        <div className="p-4 mx-auto">
          <div className="flex flex-col gap-4 w-full">
            <div className="w-full">
              <Label
                htmlFor="title"
                className="text-base font-normal text-neutral required"
              >
                Título
              </Label>
              <Input
                id="title"
                type="text"
                placeholder="Digite o título"
                value={title}
                onChange={(e) => setTitle(e.target.value.substring(0, 100))}
                className="mt-2 border-gray-300 focus:ring-2 focus:ring-gray-400 rounded-lg text-gray-900"
                maxLength={100}
              />
            </div>
            <div className="w-full">
              <Label
                htmlFor="description"
                className="text-base font-normal text-neutral required"
              >
                Descrição
              </Label>
              <TextareaDashboard
                id="description"
                value={description}
                onChange={(value: string) =>
                  setDescription(value.substring(0, 500))
                }
                placeholder="Digite a descrição"
              />
            </div>
          </div>
        </div>

        <CardHeader className="flex justify-end">
          <div className="flex justify-end w-full">
            <Button
              onClick={() => {
                setEditingBanner(null)
                setTempBanner({ id: '', url: '', image: '' })
                setPreviewImage(null)
                setIsDialogOpen(true)
              }}
              disabled={!canAddMoreBanners}
              className={`py-3 px-3 transition-all ${
                !tempBanner.image || !tempBanner.url
                  ? 'bg-primary-200 text-white cursor-not-allowed'
                  : 'bg-primary text-white hover:bg-primary-800'
              }`}
            >
              Adicionar
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
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
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

          {/* Botão Salvar */}
          <div className="flex justify-end mt-5">
            <Button
              onClick={handleSave}
              className="px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-700 transition"
            >
              Salvar
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Modal para adicionar/editar imagem */}
      {isDialogOpen && (
        <Dialog open={isDialogOpen} onOpenChange={closeDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {editingBanner ? 'Editando imagem' : 'Adicionando imagem'}
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
                    !tempBanner.image || !tempBanner.url
                      ? 'bg-primary-200 text-white cursor-not-allowed'
                      : 'bg-primary text-white hover:bg-primary-800'
                  }`}
                  disabled={!tempBanner.image || !tempBanner.url}
                  onClick={handleConfirmBanner}
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
              <DialogTitle>Deletar imagem</DialogTitle>
            </DialogHeader>
            <p>Tem certeza de que deseja deletar esta imagem?</p>
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

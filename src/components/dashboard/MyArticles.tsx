import React, { useState } from 'react';
import { Plus, Search, Filter } from 'lucide-react';
import { ArticleCard } from '../articles/ArticleCard';
import { CreateArticleForm } from '../articles/CreateArticleForm';
import { Article } from '../../types';
import { useAuth } from '../../contexts/AuthContext';

export function MyArticles() {
  const { user } = useAuth();
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all'); // all, public, private
  const [articles, setArticles] = useState<Article[]>([
    {
      id: '1',
      title: 'Mon premier article de blog',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      authorId: '1',
      author: {
        id: '1',
        fullName: 'John Doe',
        username: 'johndoe',
        email: 'john@example.com',
        phone: '+33123456789',
        avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2'
      },
      isPublic: true,
      allowComments: true,
      createdAt: new Date('2024-01-15'),
      updatedAt: new Date('2024-01-15'),
      comments: []
    },
    {
      id: '2',
      title: 'Mes réflexions personnelles',
      content: 'Ceci est un article privé avec mes réflexions personnelles que je ne souhaite pas partager publiquement pour le moment.',
      authorId: '1',
      author: {
        id: '1',
        fullName: 'John Doe',
        username: 'johndoe',
        email: 'john@example.com',
        phone: '+33123456789',
        avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2'
      },
      isPublic: false,
      allowComments: false,
      createdAt: new Date('2024-01-10'),
      updatedAt: new Date('2024-01-10'),
      comments: []
    }
  ]);

  const handleCreateArticle = (articleData: any) => {
    const newArticle: Article = {
      id: Date.now().toString(),
      ...articleData,
      createdAt: new Date(),
      updatedAt: new Date(),
      comments: []
    };
    
    setArticles(prev => [newArticle, ...prev]);
    setShowCreateForm(false);
  };

  const handleDeleteArticle = (articleId: string) => {
    setArticles(prev => prev.filter(article => article.id !== articleId));
  };

  const handleEditArticle = (article: Article) => {
    // Pour l'instant, on réutilise le formulaire de création
    // Dans une implémentation complète, on aurait un formulaire d'édition
    console.log('Editing article:', article);
  };

  const filteredArticles = articles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.content.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = filter === 'all' || 
                         (filter === 'public' && article.isPublic) ||
                         (filter === 'private' && !article.isPublic);
    
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Mes Articles</h1>
          <p className="text-gray-600 mt-2">Gérez tous vos articles de blog</p>
        </div>
        <button
          onClick={() => setShowCreateForm(true)}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="h-5 w-5" />
          Nouvel Article
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Rechercher dans vos articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Filter className="h-5 w-5 text-gray-400" />
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">Tous les articles</option>
              <option value="public">Publics</option>
              <option value="private">Privés</option>
            </select>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        {filteredArticles.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg shadow-sm border border-gray-200">
            <p className="text-gray-500">
              {searchTerm || filter !== 'all' 
                ? 'Aucun article ne correspond à vos critères de recherche.'
                : 'Vous n\'avez encore créé aucun article.'
              }
            </p>
            {!searchTerm && filter === 'all' && (
              <button
                onClick={() => setShowCreateForm(true)}
                className="mt-4 text-blue-600 hover:text-blue-700 font-medium"
              >
                Créer votre premier article
              </button>
            )}
          </div>
        ) : (
          filteredArticles.map(article => (
            <ArticleCard
              key={article.id}
              article={article}
              showActions={true}
              onEdit={handleEditArticle}
              onDelete={handleDeleteArticle}
            />
          ))
        )}
      </div>

      {showCreateForm && (
        <CreateArticleForm
          onClose={() => setShowCreateForm(false)}
          onSave={handleCreateArticle}
        />
      )}
    </div>
  );
}
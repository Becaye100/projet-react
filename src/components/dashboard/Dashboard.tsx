import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { ArticleCard } from '../articles/ArticleCard';
import { CreateArticleForm } from '../articles/CreateArticleForm';
import { Article } from '../../types';
import { useAuth } from '../../contexts/AuthContext';

export function Dashboard() {
  const { user } = useAuth();
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [articles, setArticles] = useState<Article[]>([
    {
      id: '1',
      title: 'Mon premier article de blog',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris...',
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

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Tableau de bord</h1>
          <p className="text-gray-600 mt-2">Bienvenue sur votre blog personnel, {user?.fullName}</p>
        </div>
        <button
          onClick={() => setShowCreateForm(true)}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="h-5 w-5" />
          Nouvel Article
        </button>
      </div>

      <div className="grid gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Statistiques</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">{articles.length}</div>
              <div className="text-sm text-gray-600">Articles publiés</div>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">0</div>
              <div className="text-sm text-gray-600">Amis</div>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">0</div>
              <div className="text-sm text-gray-600">Commentaires</div>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Fil d'actualité</h2>
          <div className="space-y-6">
            {articles.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-lg shadow-sm border border-gray-200">
                <p className="text-gray-500">Aucun article pour le moment.</p>
                <button
                  onClick={() => setShowCreateForm(true)}
                  className="mt-4 text-blue-600 hover:text-blue-700 font-medium"
                >
                  Créer votre premier article
                </button>
              </div>
            ) : (
              articles.map(article => (
                <ArticleCard
                  key={article.id}
                  article={article}
                  showActions={article.authorId === user?.id}
                  onDelete={handleDeleteArticle}
                />
              ))
            )}
          </div>
        </div>
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
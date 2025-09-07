import React, { useState } from 'react';
import { Search, UserPlus, UserX, UserCheck } from 'lucide-react';
import { User } from '../../types';

export function FriendsList() {
  const [searchTerm, setSearchTerm] = useState('');
  const [friends] = useState<User[]>([
    {
      id: '2',
      fullName: 'Alice Martin',
      username: 'alicemartin',
      email: 'alice@example.com',
      phone: '+33123456788',
      avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2'
    },
    {
      id: '3',
      fullName: 'Bob Dupont',
      username: 'bobdupont',
      email: 'bob@example.com',
      phone: '+33123456787',
      avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2'
    }
  ]);

  const filteredFriends = friends.filter(friend =>
    friend.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    friend.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Mes Amis</h1>
        <p className="text-gray-600 mt-2">Gérez votre cercle d'amis</p>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            type="text"
            placeholder="Rechercher un ami..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      <div className="grid gap-4">
        {filteredFriends.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg shadow-sm border border-gray-200">
            <UserPlus className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">
              {searchTerm ? 'Aucun ami ne correspond à votre recherche.' : 'Vous n\'avez pas encore d\'amis.'}
            </p>
          </div>
        ) : (
          filteredFriends.map(friend => (
            <div key={friend.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <img
                    src={friend.avatar}
                    alt={friend.fullName}
                    className="h-12 w-12 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="font-semibold text-gray-900">{friend.fullName}</h3>
                    <p className="text-sm text-gray-500">@{friend.username}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <button className="flex items-center gap-2 px-3 py-2 text-sm text-green-600 bg-green-50 rounded-lg hover:bg-green-100 transition-colors">
                    <UserCheck className="h-4 w-4" />
                    Ami
                  </button>
                  <button className="flex items-center gap-2 px-3 py-2 text-sm text-red-600 bg-red-50 rounded-lg hover:bg-red-100 transition-colors">
                    <UserX className="h-4 w-4" />
                    Supprimer
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}